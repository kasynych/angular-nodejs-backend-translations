"use strict";
/** @module projects */
// if(process.env.db == 'mongodb'){
//   module.exports = require('./mongo/model')('projects');
//   return;
// }
const db = require("./db");
//var logs = require('../modules/logs');
const Classes = require("../../../classes");
const projects_mdb = require("../mongo/model")("projects");

var items_per_page = 50;

/**
 * Creates project record
 * @param {Project} project_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.create = (project_arg, cb) => {
  let project;
  project = new Classes.Project(project_arg);
  

  db.query(
    "INSERT INTO projects SET project_name=?, platform=?",
    [project.project_name, project.platform],
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
        delete project._id;
        projects_mdb.create(project, function(a, b) {});
      }
      cb(null, results.insertId);
    }
  );
  //  db_connection.end();
};

/**
 * Updates project record
 * @param {Project} project_arg
 * @param {function} cb
 * @returns {void}
 */
module.exports.update = (project_arg, cb) => {
  let project = new Classes.Project(project_arg);
  

  db.query(
    "UPDATE projects SET project_name=?, platform=? WHERE project_id=?",
    [project.project_name, project.platform, project.id],
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
        projects_mdb.update(project, function(a, b) {});
      cb(null, "success");
    }
  );
};

/**
 * Gets list of projects
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
    "SELECT * FROM projects ORDER BY projects.project_id ASC" +
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
      db.query("SELECT count(*) as cnt FROM projects", function(
        error2,
        results2,
        fields2
      ) {
        if (error2) {
          console.log(error2), cb(error2, null);
          return;
        }

        let projects = [];
        for (let i in results) projects.push(new Classes.Project(results[i]));
        cb(null, {
          data: projects,
          total_pages: Math.ceil(results2[0].cnt / pagination.items_per_page)
        });
      });

      
    }
  );
};

/**
 * Gets project by ID
 * @param {number} project_id
 * @param {function} cb
 * @returns {void}
 */
module.exports.getById = (project_id, cb) => {
  
  db.query(
    `SELECT * FROM projects
            WHERE projects.project_id=?`,
    [project_id],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        cb(error, null);
        return;
      }
      if (results.length == 0) {
        console.log(results, project_id);
        cb(new Error("Project not found!"), null);
        return;
      }
      
      cb(null, { data: new Classes.Project(results[0]) });
    }
  );
};

/**
 * Deletes project record
 * @param {Array<number>} project_ids
 * @param {function} cb
 * @returns {void}
 */
module.exports.delete = (project_ids, cb) => {
  
  var project_ids_arr = (project_ids + "").split(",");
  for (var i in project_ids_arr)
    if (isNaN(project_ids_arr[i])) {
      cb(new Error("Wrong project ids"), null);
      return;
    }

  db.query(
    "DELETE FROM projects WHERE project_id IN (" + project_ids + ")",
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
        projects_mdb.delete(project_ids, function(a, b) {});
      cb(null, results.affectedRows);
      
      //      logs.create("Projects deleted. Project ID="+project_ids);
    }
  );
};
