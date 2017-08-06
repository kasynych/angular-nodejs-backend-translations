"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Classes = require('../classes');

const comments = (function () {
  if (process.env.db == "mysql")
    return require("../modules/models/sql/comments");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("comments");
})();

// create application/json parser
var jsonParser = bodyParser.json();

router.get('/', function (req, res) {
  let args = {
    page: typeof req.query.page != 'undefined' ? ~~req.query.page : 1,
    filter: {}
  };

  if (!isNaN(req.query.project_id)) args.filter["project.id"] = ~~req.query.project_id;
  if (!isNaN(req.query.language_id)) args.filter["language.id"] = ~~req.query.language_id;

  comments.get(args, function (error, results) {
    if (error instanceof Error) {
      res.status(404).end();
      return;
    }
    res.json(results);
  });
});

router.get('/new-one', function (req, res) {
  let comments = require('../modules/models/mongo/comments');

  comments.getNewOne({ignore_uuids: req.query.ignore_uuids.split(',')}, function (error, results) {
    if (error instanceof Error) {
      console.log(error);
      res.status(404).end();
      return;
    }
    res.json(results);
  })
})

router.post("/", jsonParser, function (req, res) {
  comments.create(req.body, function (error, results) {
    if (error instanceof Error) {
      res.json({
        error: "error"
      });
      return;
    }

    res.json({
      success: "success",
      data: {
        id: results
      }
    });
  });
});

router.put("/", jsonParser, function (req, res) {
  const translations = require("../modules/models/mongo/model")("translations");
  const users = require("../modules/models/mongo/model")("users");

  let comment = new Classes.CommentExtended(req.body);
  if (req.query.action.indexOf('approve') != -1) comment.status = "approved";
  else if (req.query.action.indexOf('reject') != -1 || req.query.action.indexOf('ban') != -1) {
    comment.status = "rejected";
    comment.user.valid = 0;
  }
  else if (req.query.action.indexOf('skip') != -1) {
    res.json({
      "success": "success",
      data: {}
    });
    return;
  }
  
  let comments = require('../modules/models/mongo/comments');

  comments.update(comment, function (error, results) {
    if (error instanceof Error) {
      res.json({
        error: "error"
      });
      return;
    }

    if (req.query.action.indexOf('response') != -1 || req.query.action.indexOf('check') != -1) {
      let translation_id = 0;
      if (comment.parent_translation != null)
        translation_id = comment.parent_translation.id;
      else {
        let cur_comment = comment;
        let limit = 100;
        while (cur_comment.parent_comment != null && limit > 0) {
          if (cur_comment.parent_comment == null) {
            res.status(400);
            return;
          }
          cur_comment = cur_comment.parent_comment;
          limit--;
        }

        if (limit <= 0) {
          res.status(400);
          return;
        }

        translation_id = cur_comment.parent_translation.id;
      }

      if (translation_id == 0) {
        res.status(500);
        return;
      }

      translations.getById(translation_id,function(error,results){
        if(error){res.status(500);return;}
        let translation = new Classes.Translation(results.data);
        if (req.query.action.indexOf('response') != -1)
          translation.status = 'answer user comments';
        else if (req.query.action.indexOf('check') != -1)
          translation.status = 'moderator check';

        translations.update(translation, function (error, results) {
          if (error) {
            res.status(500);
            return;
          }
          res.json({
            "success": "success",
            data: {}
          })
        });
      })

    } else if(req.query.action.indexOf('ban') != -1){
      let user = new Classes.User(comment.user);
      user.valid=0;
      users.update(user,function(error,results){
        if(error){res.status(500);return;}
        res.json({
          "success": "success",
          data: {}
        })
      });
    } else
      res.json({
        "success": "success",
        data: {}
      })
  });
})

module.exports = router;