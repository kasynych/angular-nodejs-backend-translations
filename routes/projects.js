"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const projects = (function() {
  if (process.env.db == "mysql")
    return require("../modules/models/sql/projects");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("projects");
})();

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/", function(req, res) {
  let args = { page: 1 };
  projects.get(args, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/project", function(req, res) {
  projects.getById(req.query.project_id, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/:id", function(req, res) {
  if (!isNaN(req.params.id))
    res.redirect("/api/projects/project?project_id=" + req.params.id);
});

router.post("/", jsonParser, function(req, res) {
  projects.create(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { id: results } });
  });
});

router.put("/:id?", jsonParser, function(req, res) {
  projects.update(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json({ success: "success" });
  });
});

router.delete("/", function(req, res) {
  projects.delete(req.query.ids, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { affected_rows: results } });
  });
});
router.delete("/:id", function(req, res) {
  if (/[0-9\,]+/.test(req.params.id))
    res.redirect("/api/projects?ids=" + req.params.id);
});

module.exports = router;
