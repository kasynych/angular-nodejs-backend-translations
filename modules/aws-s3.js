"use strict";
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2"
});
const s3 = new AWS.S3();
const stream = require("stream");
const bucketName = "fel-community";
const url_base = "https://s3-us-west-2.amazonaws.com";

/**
 * @param {string} args.filename - Filename
 * @param {Object} args.params - AWS S3 params
 * @param {binary} body - File content
 * @param {Function} cb - Callback function
 */
module.exports.putObject = (args, body, cb) => {
  var keyName = args.constructor == String ? args : args.filename;
  var params = { Bucket: bucketName, Key: keyName, Body: body };
  if (typeof args.params != "undefined")
    for (let i in args.params) params[i] = args.params[i];

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
      cb("Error uploading file to amazon", null);
    } else {
      console.log(
        "Successfully uploaded data to " + bucketName + "/" + keyName
      );
      cb(null, keyName);
    }
  });
};

/**
 * Sreams Object to AWS S3
 * @param {string} filename
 * @param {Function} cb
 * @returns {void}
 */
module.exports.uploadStream = (filename, cb) => {
  var pass = new stream.PassThrough();

  var params = {
    Bucket: bucketName,
    Key: filename,
    Body: pass,
    ACL: "public-read"
  };
  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err);
      cb(err, null);
      return;
    }
    cb(null, data);
  });

  return pass;
};

/**
 * @param {string} filename - Filename
 * @param {WritableStream} stream - Writable stream
 * @param {Function} cb -  Callback function
 */
module.exports.streamObject = (filename, stream, cb) => {
  var params = {
    Bucket: bucketName,
    Key: filename
  };
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err);
      cb("File not found", null);
      return;
    } else {
      s3.getObject(params).createReadStream().pipe(stream);
      stream.on("finish", () => {
        cb(null, "success");
      });
      stream.on("error", arg => {
        console.log(arg);
        cb("Error streaming file", null);
      });
    }
  });
};

/**
 * @param {string} filename - Filename
 * @param {Function} cb - Callback function
 */
module.exports.getObject = (args, cb) => {
  var keyName = args.constructor == String ? args : args.filename;
  var params = {
    Bucket: bucketName,
    Key: keyName
  };
  if (args.constructor == Object && typeof args.params != "undefined")
    for (let i in args.params) params[i] = args.params[i];
  return s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err);
      cb("Error getting file", null);
      return;
    } else {
      cb(null, data);
    }
  });
};

/**
 * @param {string} filename - Filename
 * @param {Function} cb - Callback function
 */
module.exports.deleteObject = (filename, cb) => {
  var params = {
    Bucket: bucketName,
    Key: filename
  };
  s3.deleteObject(params, function(err, data) {
    if (err) cb("Error deleting file", null);
    else cb(null, "success");
  });
};

/**
 * @param {string} filename - Filename
 * @param {string} filetype - File type
 * @param {Function} cb - Callback function
 */
module.exports.getSignedUrl = (filename, filetype, cb) => {
  const s3Params = {
    Bucket: bucketName,
    Key: filename,
    Expires: 60,
    //    ContentType: filetype,
    ACL: "public-read"
  };

  if (filename.indexOf(".strings") == -1) s3Params.ContentType = filetype;

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
      return;
    }
    const returnData = {
      signedRequest: data,
      url: getFileUrl(filename),
      filename: filename,
      filetype: filetype
    };
    cb(null, returnData);
  });
};

/**
 * Gets file url
 * @param {string} filename
 * @returns {string}
 */
var getFileUrl = (filename, ssl = true) => {
  let url_base_new = ssl ? url_base : url_base.replace("https://", "http://");
  return url_base_new + "/" + bucketName + "/" + filename;
};
module.exports.getFileUrl = getFileUrl;

/**
 * Gets Object Tags
 * @param {string} filename 
 * @returns {void}
 */
module.exports.getObjectTagging = (filename, cb) => {
  var params = {
    Bucket: bucketName,
    Key: filename
  };
  s3.getObjectTagging(params, function(err, data) {
    if (err) {
      console.log(err);
      cb("File not found", null);
      return;
    }

    cb(null, data);
  });
};

/**
 * To list object versions
 * @param {string} filename 
 * @returns {void}
 */
module.exports.listObjectVersions = (filename, cb) => {
  var params = {
    Bucket: bucketName,
    Prefix: filename
  };
  s3.listObjectVersions(params, function(err, data) {
    if (err) {
      console.log(err);
      cb("File not found", null);
      return;
    }

    cb(null, data.Versions);
  });
};
