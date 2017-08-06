"use strict";
const aws_s3 = require("./aws-s3");
const Classes = require("../classes");
let media_import_progress = 0;
const media_extensions = ["mp3", "jpg", "jpeg", "gif", "png"];
const versions_limit = 1000;

const translations = (function() {
  if (process.env.db == "mysql")
    return require("../modules/models/sql/translations");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("translations");
})();

module.exports.media_extensions = media_extensions;

module.exports.media_import_progress = function() {
  return media_import_progress;
};

module.exports.reset_media_import_progress = function() {
  media_import_progress = 0;
};

module.exports.import_media = (args, cb) => {
  var http = require("http");
  var url = require("url");
  var JSZip = require("jszip");
  let filename = args.filename;
  let index = 0;
  let files = [];
  let total_size = 0;
  let uploaded_size = 0;
  let start_time = Date.now();
  let work_time = () => {
    return Date.now() - start_time;
  };
  let filetype = "audio";

  let extension = filename.split(".").pop();
  if (extension == "zip") {
    var req = http.get(url.parse(aws_s3.getFileUrl(filename, false)), function(
      res
    ) {
      if (res.statusCode !== 200) {
        console.log(res.statusCode);
        // handle error
        cb(new Error("Could not find object on s3"), null);
        return;
      }
      var data = [],
        dataLen = 0;

      // don't set the encoding, it will break everything !
      // or, if you must, set it to null. In that case the chunk will be a string.

      res.on("data", function(chunk) {
        data.push(chunk);
        dataLen += chunk.length;
      });

      res.on("end", function() {
        
        var buf = Buffer.concat(data);

        // here we go !
        let extension = filename.split(".").pop();
        JSZip.loadAsync(buf)
          .then(function(zip) {
            // zip.forEach(function(relativePath, file) {
            //   console.log(file.name,'is dir:',file.dir);
            // });
            zip.forEach(function(relativePath, file) {
              let extension = file.name.split(".").pop();
              if (media_extensions.indexOf(extension) != -1) {
                files.push(file);
                if (file.name.indexOf(".mp3") == file.name.length - 4) {
                  filetype = "audio";
                  file.name = "audio/" + file.name;
                } else {
                  filetype = "image";
                  file.name = "images/" + file.name;
                }
                total_size += file._data.uncompressedSize;
                console.log("Total size:", total_size);
              }
            });
            uploadFile(files, index, cb);
          })
          .catch(err => cb(err, null));
      });
    });

    req.on("error", function(err) {
      // handle error
      done(err);
    });
  } else if (media_extensions.indexOf(extension) != -1) {
    if (typeof args.t_a_filename == "undefined") {
      cb(new Error("Wrong parameters"));
      return;
    }

    let extension = filename.split(".").pop();
    if (media_extensions.indexOf(extension) != -1) {
      if (filename.indexOf(".mp3") == filename.length - 4) {
        filetype = "audio";
        args.t_a_filename = args.t_a_filename;
      } else {
        filetype = "image";
        args.t_a_filename = args.t_a_filename;
      }
    }

    let filter = {};
    switch (filetype) {
      case "audio":
        filter = {
          audio_stack: { $elemMatch: { filename: args.t_a_filename } }
        };
        break;
      case "image":
        filter = {
          images_stack: { $elemMatch: { filename: args.t_a_filename } }
        };
    }
    translations.get({ filter: filter }, function(error, translations_res) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }

      let update_translations = [];
      aws_s3.getObject(filename, function(error, results) {
        if (error) {
          cb(error, null);
          return;
        }
        console.log(results.ContentType);
        if (
          results.ContentType != "audio/mp3" &&
          results.ContentType != "image/jpeg" &&
          results.ContentType != "image/png" &&
          results.ContentType != "image/gif"
        ) {
          cb(new Error("Wrong file type"), null);
          return;
        }
        for (let i in translations_res.data) {
          let translation = new Classes.Translation(translations_res.data[i]);

          switch (filetype) {
            case "audio":
              let audio = new Classes.TranslationAudio(
                translation.audio_stack[translation.audio_stack.length - 1]
              );
              audio.filesize = results.ContentLength;
              audio.instructions = "";
              translation.audio_stack.push(audio);
              break;
            case "image":
              let image = new Classes.TranslationImage(
                translation.images_stack[translation.images_stack.length - 1]
              );
              image.filesize = results.ContentLength;
              image.instructions = "";
              translation.images_stack.push(image);
              break;
          }
          update_translations.push(translation);
        }
        let aws_s3_args = {
          filename: args.t_a_filename,
          params: { ACL: "public-read" }
        };
        aws_s3.putObject(aws_s3_args, results.Body, function(error, results) {
          if (error) {
            cb(error, null);
            return;
          }
          aws_s3.getObject(args.t_a_filename, function(error, object) {
            if (error) {
              cb(error, null);
              return;
            }

            update_translations.forEach(function(t) {
              switch (filetype) {
                case "audio":
                  t.audio_stack[t.audio_stack.length - 1].s3_version_id =
                    object.VersionId;
                  break;
                case "image":
                  t.images_stack[t.images_stack.length - 1].s3_version_id =
                    object.VersionId;
                  break;
              }
            });
            updateRecursive(
              update_translations,
              0,
              function() {
                cb(null, "success");
                if (filename != args.t_a_filename);
                aws_s3.deleteObject(filename, function(error, results) {});
              },
              cb
            );
          });
        });
      });
    });
  } else {
    cb(new Error("Wrong extension"));
    return;
  }

  var uploadFile = (files, index, cb) => {
    let translation = new Classes.Translation();

    if (typeof files[index] == "undefined") {
      console.log("uploaded " + index + " files");
      media_import_progress = 100;

      setTimeout(function() {
        media_import_progress = 0;
      }, 30 * 1000);

      cb(null, "success");
      return;
    }

    let extension = files[index].name.split(".").pop();
    if (media_extensions.indexOf(extension) == -1) {
      console.log("wrong file extension: ", files[index].name);
      uploadFile(files, ++index, cb);
      return;
    }

    let filter = {};

    switch (filetype) {
      case "audio":
        filter = {
          audio_stack: { $elemMatch: { filename: files[index].name } }
        };
        break;
      case "image":
        filter = {
          images_stack: { $elemMatch: { filename: files[index].name } }
        };
    }

    translations.get({ filter: filter }, function(error, translations_res) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }

      let update_translations = [];
      for (let i in translations_res.data) {
        translation = new Classes.Translation(translations_res.data[i]);

        switch (filetype) {
          case "audio":
            let audio = new Classes.TranslationAudio(
              translation.audio_stack[translation.audio_stack.length - 1]
            );
            audio.filesize = files[index]._data.uncompressedSize;
            audio.instructions = "";
            translation.audio_stack.push(audio);
            break;
          case "image":
            let image = new Classes.TranslationImage(
              translation.images_stack[translation.images_stack.length - 1]
            );
            image.filesize = files[index]._data.uncompressedSize;
            image.instructions = "";
            translation.images_stack.push(image);
            break;
        }
        update_translations.push(translation);
      }

      console.log("uploading", files[index].name);

      files[index].nodeStream().pipe(
        aws_s3.uploadStream(files[index].name, function(error, results) {
          if (error) return;

          //          aws_s3.getObject(files[index].name, function(error, data) {
          if (error) return;
          update_translations.forEach(function(t) {
            switch (filetype) {
              case "audio":
                t.audio_stack[t.audio_stack.length - 1].s3_version_id =
                  results.VersionId;
                break;
              case "image":
                t.images_stack[t.images_stack.length - 1].s3_version_id =
                  results.VersionId;
                break;
            }
          });

          uploaded_size += files[index]._data.uncompressedSize;
          console.log(
            "Total size:",
            total_size,
            "Uploaded size:",
            uploaded_size
          );
          media_import_progress = Math.round(uploaded_size / total_size * 100);

          updateRecursive(update_translations, 0, uploadFile, cb);
          //          });
        })
      );
    });
  };

  var updateRecursive = (update_translations, t_index, cb1, cb) => {
    if (t_index >= update_translations.length) {
      cb1(files, ++index, cb);
      return;
    }

    update_translations[t_index].audio_stack  = update_translations[t_index].audio_stack.slice(0,versions_limit);
    update_translations[t_index].images_stack = update_translations[t_index].images_stack.slice(0,versions_limit);

    translations.update(update_translations[t_index], function(error, results) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      updateRecursive(update_translations, ++t_index, cb1, cb);
    });
  };
};
