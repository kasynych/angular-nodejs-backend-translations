"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Classes = require("../classes");

const translations = (function() {
  if (process.env.db == "mysql")
    return require("../modules/models/sql/translations");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("translations");
})();

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/", function(req, res) {
  let args = {
    page: typeof req.query.page != 'undefined'? ~~req.query.page : 1,
    filter: {}
  };

  if(!isNaN(req.query.project_id)) args.filter["project.id"] = ~~req.query.project_id;
  if(!isNaN(req.query.language_id)) args.filter["language.id"] = ~~req.query.language_id;
  
  translations.get(args, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/translation", function(req, res) {
  translations.getById(req.query.translation_id, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/:id", function(req, res) {
  if (!isNaN(req.params.id))
    res.redirect(
      "/api/translations/translation?translation_id=" + req.params.id
    );
});

router.post("/", jsonParser, function(req, res) {
  translations.create(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { id: results } });
  });
});

router.put("/", jsonParser, function(req, res) {
  translations.update(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    console.log(results);
    res.json({ success: "success" });
  });
});

router.put("/:id", function(req, res) {
  if (!isNaN(req.params.id)) res.redirect("/api/translations/");
});

router.delete("/", function(req, res) {
  translations.delete(req.query.ids, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { affected_rows: results } });
  });
});

// router.get('/audio/record', function (req,res) {
//   translations.getById(req.query.translation_id,function(error,results){
//     if(error instanceof Error){res.json({"error":"error"}); return;}
//     console.log(results,results.audio);
//     res.json({"success":"success","data":results.data.audio});
//   });
// });

// router.get('/audio/:id', function (req,res) {
//   if(!isNaN(req.params.id)) res.redirect('/api/translations/audio/record?translation_id='+req.params.id);
// });

router.put("/media/import", jsonParser, function(req, res) {
  let translations2 = require("../modules/translations");
  if (translations2.media_import_progress() != 0) {
    res.status(409).send("Import in progress");
    return;
  }

  let args = { filename: req.body.filename };
  if (typeof req.body.t_a_filename != undefined)
    args.t_a_filename = req.body.t_a_filename;
  translations2.import_media(args, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    let extension = req.body.filename.split(".").pop();
    if (translations2.media_extensions.indexOf(extension) != -1)
      res.json({ success: "success", data: {} });
  });

  if (req.body.filename.indexOf(".zip") == req.body.filename.length - 4)
    setTimeout(function() {
      res.json({ success: "success", data: {} });
    }, 1000);
});

router.put("/audio/import", function(req, res) {
  res.redirect("/api/translations/media/import");
});

router.put("/images/import", function(req, res) {
  res.redirect("/api/translations/media/import");
});

router.get("/media/import/check", function(req, res) {
  let translations2 = require("../modules/translations");
  res
    .json({
      success: "success",
      data: { progress: translations2.media_import_progress() }
    })
    .end();

  if (translations2.media_import_progress() >= 100)
    translations2.reset_media_import_progress();
});

router.get("/audio/import/check", function(req, res) {
  res.redirect("/api/translations/media/import/check");
});

router.get("/images/import/check", function(req, res) {
  res.redirect("/api/translations/media/import/check");
});

module.exports = router;
