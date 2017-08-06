"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const languages = (function() {
  if (process.env.db == "mysql")
    return require("../modules/models/sql/languages");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("languages");
})();

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/", function(req, res) {
  let args = { page: 1 };
  languages.get(args, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/language", function(req, res) {
  languages.getById(req.query.language_id, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/:id", function(req, res) {
  if (!isNaN(req.params.id))
    res.redirect("/api/languages/language?language_id=" + req.params.id);
});

router.post("/", jsonParser, function(req, res) {
  languages.create(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { id: results } });
  });
});

router.put("/:id?", jsonParser, function(req, res) {
  languages.update(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    console.log(results);
    res.json({ success: "success" });
  });
});

router.delete("/", function(req, res) {
  languages.delete(req.query.ids, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { affected_rows: results } });
  });
});

module.exports = router;
