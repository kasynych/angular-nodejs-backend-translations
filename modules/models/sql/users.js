"use strict";
/** @module users */
// if(process.env.db == 'mongodb'){
//   module.exports = require('./mongo/model')('users');
//   return;
// }
const db = require("./db");
//var logs = require('../modules/logs');
const Classes = require("../../../classes");
const users_mdb = require("../mongo/model")("users");

var items_per_page = 20;

/**
 * Creates user record
 * @param {User} user_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.create = (user_arg, cb) => {
  let user;
  try {
    user = new Classes.User(user_arg);
  } catch (e) {
    console.log("this is exception->", e);
  }
  

  db.query(
    "INSERT INTO users SET username=?, email=?, password=sha1(?), firstname=?, lastname=?, type_id=?, role_id=?, valid=?",
    [
      user.username,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
      user.type_id,
      user.role_id,
      user.valid
    ],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      
      var user_id = results.insertId;
      //    logs.create("New user created. User ID="+user_id);
      if (user.languages.length > 0 || user.projects.length > 0) {
        var user_access = user.languages.concat(user.projects);
        var users_languages_inserts = [];
        var users_projects_inserts = [];
        for (var i in user_access) {
          if (
            (isNaN(user_access[i].project_id) &&
              user_access[i].project_id != null) ||
            (isNaN(user_access[i].language_id) &&
              user_access[i].language_id != null)
          ) {
            cb(new Error("Validation error"), null);
            return;
          }
        }

        for (let i in user.languages)
          users_languages_inserts.push(
            "(" + user_id + "," + user.languages[i].language_id + ")"
          );

        for (let i in user.projects)
          users_projects_inserts.push(
            "(" + user_id + "," + user.projects[i].project_id + ")"
          );
        db.query(
          `DELETE FROM users_languages_rel WHERE user_id=${user_id};
                DELETE FROM users_projects_rel WHERE user_id=${user_id};
                INSERT INTO users_languages_rel(user_id,language_id) VALUES ${users_languages_inserts.join(
                  ","
                )};
                INSERT INTO users_projects_rel(user_id,project_id) VALUES ${users_projects_inserts.join(
                  ","
                )}`,
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
              delete user._id;
              users_mdb.create(user, function(a, b) {});
            }
            cb(null, user_id);
          }
        );
      } else {
        if (
          (process.env.environment == "dev" ||
            process.env.environment == "test") &&
          process.env.db == "mysql"
        ) {
          delete user._id;
          users_mdb.create(user, function(a, b) {});
        }
        cb(null, user_id);
      }
    }
  );
  //  db_connection.end();
};

/**
 * Updates user record
 * @param {User} user_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.update = (user_arg, cb) => {
  let user = new Classes.User(user_arg);
  

  let sql = "UPDATE users SET ";

  if (user.password == null) {
    sql += `username=${db.escape(user.username)}, 
            email=${db.escape(user.email)}, 
            firstname=${db.escape(user.firstname)}, 
            lastname=${db.escape(user.lastname)}, 
            type_id=${db.escape(user.type_id)}, 
            role_id=${db.escape(user.role_id)}, 
            valid=${db.escape(user.valid)} `;
  } else sql += `${"password=sha1(" + db.escape(user.password) + ")"} `;

  sql += `WHERE user_id=${db.escape(user.id)}`;

  db.query(sql, function(error, results, fields) {
    if (error) {
      cb(error, null);
      return;
    }
    
    //    logs.create("User updated. User ID="+user.id);
    if (user.languages.length > 0 || user.projects.length > 0) {
      var user_access = user.languages.concat(user.projects);
      var users_languages_inserts = [];
      var users_projects_inserts = [];
      for (var i in user_access) {
        if (
          (isNaN(user_access[i].project_id) &&
            user_access[i].project_id != null) ||
          (isNaN(user_access[i].language_id) &&
            user_access[i].language_id != null)
        ) {
          cb(new Error("Validation error"), null);
          return;
        }
      }

      for (let i in user.languages)
        users_languages_inserts.push(
          "(" + user.id + "," + user.languages[i].language_id + ")"
        );

      for (let i in user.projects)
        users_projects_inserts.push(
          "(" + user.id + "," + user.projects[i].project_id + ")"
        );
      db.query(
        `DELETE FROM users_languages_rel WHERE user_id=${user.id};
                DELETE FROM users_projects_rel WHERE user_id=${user.id};
                INSERT INTO users_languages_rel(user_id,language_id) VALUES ${users_languages_inserts.join(
                  ","
                )};
                INSERT INTO users_projects_rel(user_id,project_id) VALUES ${users_projects_inserts.join(
                  ","
                )}`,
        function(error, results, fields) {
          if (error) {
            cb(error, null);
            return;
          }
          if (
            process.env.environment == "dev" ||
            process.env.environment == "test"
          )
            users_mdb.update(user, function(a, b) {});
          cb(null, "success");
        }
      );
    } else {
      db.query(
        "DELETE FROM users_languages_rel WHERE user_id=" +
          ~~user.id +
          ";DELETE FROM users_projects_rel WHERE user_id=" +
          ~~user.id,
        function(error, results, fields) {
          if (error) {
            cb(error, null);
            return;
          }
          if (
            (process.env.environment == "dev" ||
              process.env.environment == "test") &&
            process.env.db == "mysql"
          )
            users_mdb.update(user, function(a, b) {});
          cb(null, "success");
        }
      );
    }
  });
};

/**
 * Gets list of users
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
    "SELECT user_id, users.type_id, user_type, users.role_id, user_role, email, username, firstname, lastname, valid FROM users\
            INNER JOIN user_types ON user_types.user_type_id = users.type_id\
            INNER JOIN user_roles ON user_roles.user_role_id = users.role_id\
            ORDER BY users.user_id ASC" +
      (pagination.items_per_page != 0
        ? " LIMIT " +
          (pagination.page - 1) * pagination.items_per_page +
          ", " +
          pagination.items_per_page
        : ""),
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      db.query("SELECT count(*) as cnt FROM users", function(
        error2,
        results2,
        fields2
      ) {
        if (error2) {
          console.log(error2), cb(error2, null);
          return;
        }

        let users = [];
        for (let i in results) users.push(new Classes.User(results[i]));
        cb(null, {
          data: users,
          total_pages: Math.ceil(results2[0].cnt / pagination.items_per_page)
        });
      });

      
    }
  );
};

/**
 * Gets user record by user name
 * @param {string} username
 * @param {string} select
 * @param {function} cb
 * @returns {void}
 */
module.exports.getActiveByUsername = (username, select, cb) => {
  
  db.query(
    "SELECT " +
      select +
      " FROM users\
            INNER JOIN user_types ON user_types.user_type_id = users.type_id WHERE username=? AND status=1",
    [username],
    function(error, results, fields) {
      if (error) {
        cb(error, null);
        return;
      }
      
      cb(null, { data: results[0] });
    }
  );
};

/**
 * Gets user by ID
 * @param {number} user_id
 * @param {function} cb
 * @returns {void}
 */
module.exports.getById = (user_id, cb) => {
  
  db.query(
    `SELECT users.user_id, users.type_id, user_types.user_type as type, users.role_id, user_roles.user_role as role, email, username, firstname, lastname, valid FROM users
            INNER JOIN user_types ON user_types.user_type_id = users.type_id
            INNER JOIN user_roles ON user_roles.user_role_id = users.role_id
            WHERE users.user_id=?`,
    [user_id],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      if (results.length == 0) {
        cb(new Error("User not found!"), null);
        return;
      }
      var user = results[0];
      db.query(
        `SELECT users_languages_rel.language_id, languages.name AS language
              FROM users_languages_rel
              LEFT JOIN languages ON languages.language_id = users_languages_rel.language_id
              UNION
              SELECT users_projects_rel.project_id, projects.project_name AS project
              FROM users_projects_rel
              LEFT JOIN projects ON projects.project_id = users_projects_rel.project_id
              WHERE user_id=?`,
        [user_id],
        function(error, results, fields) {
          if (error) {
            console.log(error);
            cb(error, null);
            return;
          }
          

          var user_languages = [];
          var user_projects = [];
          for (var row of results) {
            if (typeof row["language"] != "undefined") user_languages.push(row);
            else if (typeof row["project"] != "undefined")
              user_projects.push(row);
          }
          cb(null, {
            data: {
              id: user.user_id,
              type_id: user.type_id,
              role_id: user.role_id,
              type: user.type,
              role: user.role,
              email: user.email,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              valid: user.valid,
              languages: user_languages,
              projects: user_projects
            }
          });
        }
      );
    }
  );
};

/**
 * Deletes user record
 * @param {Array<number>} user_ids
 * @param {function} cb
 * @returns {void}
 */
module.exports.delete = (user_ids, cb) => {
  
  var user_ids_arr = (user_ids + "").split(",");
  for (var i in user_ids_arr)
    if (isNaN(user_ids_arr[i])) {
      cb(new Error("Wrong user ids"), null);
      return;
    }
  db.query(
    "DELETE FROM users_languages_rel WHERE user_id IN (" +
      user_ids +
      ");DELETE FROM users_projects_rel WHERE user_id IN (" +
      user_ids +
      ")",
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      db.query(
        "DELETE FROM users WHERE user_id IN (" + user_ids + ")",
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
            users_mdb.delete(user_ids, function(a, b) {});
          cb(null, results.affectedRows);
          
          //      logs.create("Users deleted. User ID="+user_ids);
        }
      );
    }
  );
};
