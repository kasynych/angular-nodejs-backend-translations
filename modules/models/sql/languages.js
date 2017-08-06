"use strict";
/** @module languages */
// if(process.env.db == 'mongodb'){
//   module.exports = require('./mongo/model')('languages');
//   return;
// }
const db = require("./db");
//var logs = require('../modules/logs');
const Classes = require("../../../classes");
const languages_mdb = require("../mongo/model")("languages");

var items_per_page = 20;

/**
 * Creates language record
 * @param {Language} language_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.create = (language_arg, cb) => {
  let language;
  language = new Classes.Language(language_arg);
  

  db.query(
    "INSERT INTO languages SET language_number=?, name=?, code=?",
    [language.language_number, language.name, language.code],
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
      ) {
        delete language._id;
        languages_mdb.create(language, function(a, b) {});
      }
      cb(null, results.insertId);
    }
  );
  //  db_connection.end();
};

/**
 * Updates language record
 * @param {Language} language_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.update = (language_arg, cb) => {
  let language = new Classes.Language(language_arg);
  

  db.query(
    "UPDATE languages SET language_number=?, name=?, code=? WHERE language_id=?",
    [language.language_number, language.name, language.code, language.id],
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
        languages_mdb.update(language, function(a, b) {});
      }
      cb(null, "success");
    }
  );
};

/**
 * Gets list of languages
 * @param {Object} args
 * @param {number} args.page - Page
 * @param {number} [args.items_per_page] - Items per Page
 * @param {function} cb
 * @returns {void}
 */
module.exports.get = (args, cb) => {
  var pagination = {
    page: args.page,
    items_per_page:
      typeof args.items_per_page != "undefined"
        ? args.items_per_page
        : items_per_page
  };

  
  db.query(
    "SELECT * FROM languages ORDER BY languages.language_id ASC" +
      (pagination.items_per_page != 0
        ? " LIMIT " +
          (pagination.page - 1) * pagination.items_per_page +
          ", " +
          pagination.items_per_page
        : ""),
    function(error, results, fields) {
      if (error) {
        cb(error, null);
        return;
      }
      db.query("SELECT count(*) as cnt FROM languages", function(
        error2,
        results2,
        fields2
      ) {
        if (error2) {
          console.log(error2), cb(error2, null);
          return;
        }

        let languages = [];
        for (let i in results) languages.push(new Classes.Language(results[i]));
        cb(null, {
          data: languages,
          total_pages: Math.ceil(results2[0].cnt / pagination.items_per_page)
        });
      });

      
    }
  );
};

/**
 * Gets language by ID
 * @param {number} language_id
 * @param {function} cb
 * @returns {void}
 */
module.exports.getById = (language_id, cb) => {
  
  db.query(
    `SELECT * FROM languages
            WHERE languages.language_id=?`,
    [language_id],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      if (results.length == 0) {
        console.log(results, language_id);
        cb(new Error("Language not found!"), null);
        return;
      }
      
      console.log(results[0]);
      console.log(new Classes.Language(results[0]));
      cb(null, { data: new Classes.Language(results[0]) });
    }
  );
};

/**
 * Deletes language record
 * @param {Array<number>} language_ids
 * @param {function} cb
 * @returns {void}
 */
module.exports.delete = (language_ids, cb) => {
  
  var language_ids_arr = (language_ids + "").split(",");
  for (var i in language_ids_arr)
    if (isNaN(language_ids_arr[i])) {
      cb(new Error("Wrong language ids"), null);
      return;
    }

  db.query(
    "DELETE FROM languages WHERE language_id IN (" + language_ids + ")",
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
        languages_mdb.delete(language_ids, function(a, b) {});
      cb(null, results.affectedRows);
      
      //      logs.create("Languages deleted. Language ID="+language_ids);
    }
  );
};
