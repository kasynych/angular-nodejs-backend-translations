"use strict";
/** @module comments */
var db = require("./db");
var Classes = require("../../../classes");

var items_per_page = 20;

/**
 * Gets list of comments
 * @param {Object} args
 * @param {number} args.page - Page
 * @param {number} [args.items_per_page] - Items per Page
 * @param {number} [args.translation_id] - Translation ID
 * @param {number} [args.comment_id] - Parent Comment ID
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
    `SELECT * FROM comments
            INNER JOIN users ON users.user_id =comments.user_id
            LEFT JOIN translations ON translations.translation_id = comments.translation_id
            WHERE 1=1
            ${typeof args.translation_id != "undefined"
              ? " AND comments.translation_id=" + ~~args.translation_id
              : ""}
            ${typeof args.comment_id != "undefined"
              ? " AND comments.comment_id=" + ~~args.comment_id
              : ""}
            ${typeof args.translation_ids != "undefined" &&
            args.translation_ids.length > 0
              ? " AND comments.translation_id IN(" +
                args.translation_ids.map(id => ~~id).join(",") +
                ")"
              : ""}
            ORDER BY comments.comment_id ASC` +
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
      db.query("SELECT count(*) as cnt FROM comments", function(
        error2,
        results2,
        fields2
      ) {
        if (error2) {
          console.log(error2), cb(error2, null);
          return;
        }

        let comments = [];
        for (let i in results) {
          results[i].comments = [];
          results[i].user = new Classes.User(results[i]);
          results[i].translation = new Classes.Translation(results[i]);
          comments.push(new Classes.Comment(results[i]));
        }
        cb(null, {
          results: comments,
          total_pages: Math.ceil(results2[0].cnt / pagination.items_per_page)
        });
      });

      
    }
  );
};

/**
 * Create comment
 * @param { Comment } comment - New comment
 * @returns {void}
 */
module.exports.create = (comment_arg, cb) => {
  let comment = new Classes.Comment(comment_arg);
  
  db.query(
    'INSERT INTO comments SET text=?, score=?, user_id=?, translation_id=?, parent_comment_id=?, status="New"',
    [
      comment.text,
      comment.score,
      comment.user.id,
      comment.translation.id,
      typeof comment.comment != "undefined" ? comment.comment.comment_id : null
    ],
    function(error, results) {
      if (error) {
        console.log(error), cb(error, null);
        return;
      }
      
      cb(null, results.insertId);
    }
  );
};
