"use strict";
/** @module translations */
// if(process.env.db == 'mongodb'){
//   module.exports = require('./mongo/model')('translations');
//   return;
// }
const db = require("./db");
const Classes = require("../../../classes");
const comments = require("./comments");
const translations_mdb = require("../mongo/model")("translations");

const items_per_page = 20;

/**
 * Creates translation record
 * @param {Translation} translation_arg - Translation object
 * @param {function} cb - Callback function
 * @returns {void}
 */
module.exports.create = (translation_arg, cb) => {
  let translation = new Classes.Translation(translation_arg);
  

  db.query(
    `INSERT INTO translations SET user_id=?, english=?, text=?, image=?, translations_audio_id=?, prev_translations_audio_id=?, topic=?, subtopic=?, project_id=?, language_id=?, export=?, status=?`,
    [
      translation.user.id,
      translation.english,
      translation.text,
      translation.image,
      translation.audio_stack[translation.audio_stack.length - 1].id,
      translation.audio_stack.length > 1
        ? translation.audio_stack[translation.audio_stack.length - 2].id
        : 0,
      translation.topic,
      translation.subtopic,
      translation.project.id,
      translation.language.id,
      translation.export,
      translation.status
    ],
    function(error, results, fields) {
      if (error) {
        cb(error, null);
        return;
      }
      

      if (
        (process.env.environment == "dev" ||
          process.env.environment == "test") &&
        process.env.db == "mysql"
      ) {
        translation.id = results.insertId;
        translations_mdb.create(translation, function(a, b) {
          cb(null, results.insertId);
        });
      } else cb(null, results.insertId);
    }
  );
};

/**
 * Updates translation record
 * @param {Translation} translation_arg - Translation object
 * @param {function} cb - Callback function
 * @returns {void}
 */
module.exports.update = (translation_arg, cb) => {
  let translation = new Classes.Translation(translation_arg);
  
  db.query(
    `UPDATE translations SET english=?, text=?, image=?, translations_audio_id=?, audio=?, topic=?, subtopic=?, project_id=?, language_id=?, export=?, status=?, updated=NOW() WHERE translation_id=?`,
    [
      translation.english,
      translation.text,
      translation.image,
      0,
      '',
      translation.topic,
      translation.subtopic,
      translation.project.id,
      translation.language.id,
      translation.export,
      translation.status,
      translation.id
    ],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      
      if (
        (process.env.environment == "dev" ||
          process.env.environment == "test") &&
        process.env.db == "mysql"
      )
        translations_mdb.update(translation, function(a, b) {});
      cb(null, "success");
    }
  );
};

/**
 * Gets list of translation records
 * @param {Object} args - Parameters
 * @param {number} [args.page] - Page
 * @param {number} [args.items_per_page] - Items per Page
 * @param {number} [args.filter["project.id"]] - Project ID
 * @param {number} [args.filter[language.id"]] - Language ID
 * @param {number} [args.filter[language.id"]] - Language ID
 * @param {function} cb - Callback function
 * @returns {void}
 */
module.exports.get = (args, cb) => {
  var pagination = {
    page: typeof args.page != "undefined" ? args.page : 1,
    items_per_page:
      typeof args.items_per_page != "undefined"
        ? args.items_per_page
        : items_per_page
  };

  
  db.query(
    `SELECT translations.*,
                   projects.*,
                   languages.*,
                   users.*,
                   user_types.user_type,
                   user_roles.user_role,
                   translations_audio.*,
                   prev_translations_audio.translations_audio_id as prev_translations_audio_id,
                   prev_translations_audio.instructions as prev_instructions,
                   prev_translations_audio.notes as prev_notes,
                   prev_translations_audio.url as prev_url,
                   prev_translations_audio.filesize as prev_filesize
            FROM translations 
            INNER JOIN projects ON projects.project_id = translations.project_id
            INNER JOIN languages ON languages.language_id = translations.language_id
            INNER JOIN users ON users.user_id = translations.user_id
            INNER JOIN user_types ON users.type_id = user_types.user_type_id
            INNER JOIN user_roles ON users.role_id = user_roles.user_role_id
            LEFT JOIN translations_audio ON translations_audio.translations_audio_id = translations.translations_audio_id
            LEFT JOIN translations_audio as prev_translations_audio ON translations_audio.translations_audio_id = translations.prev_translations_audio_id
            WHERE
              translations.project_id = ${db.escape(args.filter["project.id"])}
              AND translations.language_id = ${db.escape(
                args.filter["language.id"]
              )}
              ${typeof args.filter["audio.filename"] != "undefined"
                ? " AND translations.audio.filename = " +
                  db.escape(args.filter["audio.filename"])
                : ""}
            GROUP BY translations.translation_id
            ORDER BY translations.translation_id ASC` +
      (pagination.items_per_page != 0
        ? " LIMIT " +
          (pagination.page - 1) * pagination.items_per_page +
          ", " +
          pagination.items_per_page
        : ""),
    function(error, translations, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      db.query("SELECT count(*) as cnt FROM translations", function(
        error2,
        results2,
        fields2
      ) {
        if (error2) {
          console.log(error2), cb(error2, null);
          return;
        }
        if (translations.length == 0) 

        comments.get(
          {
            page: 1,
            translation_ids: translations.map(
              translation => translation.translation_id
            )
          },
          function(error, comments) {
            if (error) {
              console.log(error);
              cb(error, null);
              return;
            }
            let users = [];

            for (let i in translations) {
              translations[i].project = new Classes.Project(translations[i]);
              translations[i].language = new Classes.Language(translations[i]);
              translations[i].user = new Classes.User(translations[i]);
              translations[i].audio = new Classes.TranslationAudio(
                translations[i]
              );
              translations[i].prev_audio = new Classes.TranslationAudio({
                translations_audio_id:
                  translations[i].prev_translations_audio_id,
                instructions: translations[i].prev_instructions,
                notes: translations[i].prev_notes,
                url: translations[i].prev_url,
                filesize: translations[i].prev_filesize
              });
              translations[i].comments = [];
            }

            let ret = translations.map(t => {
              comments.results.map(c => {
                if (c.translation.id == t.translation_id) t.comments.push(c);
              });
              return new Classes.Translation(t);
            });
            

            cb(null, {
              data: ret,
              total_pages: Math.ceil(
                results2[0].cnt / pagination.items_per_page
              )
            });
          }
        );
      });
    }
  );
};
