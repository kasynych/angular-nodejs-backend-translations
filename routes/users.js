"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const users = (function() {
  if (process.env.db == "mysql") return require("../modules/models/sql/users");
  else if (process.env.db == "mongodb")
    return require("../modules/models/mongo/model")("users");
})();

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/", function(req, res) {
  let args = { page: 1 };
  users.get(args, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/user", function(req, res) {
  users.getById(req.query.user_id, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json(results);
  });
});

router.get("/:id", function(req, res) {
  if (!isNaN(req.params.id))
    res.redirect("/api/users/user?user_id=" + req.params.id);
});

router.post("/", jsonParser, function(req, res) {
  users.create(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { id: results } });
  });
});

router.put("/:id?", jsonParser, function(req, res) {
  users.update(req.body, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }
    res.json({ success: "success" });
  });
});

router.delete("/", function(req, res) {
  users.delete(req.query.ids, function(error, results) {
    if (error instanceof Error) {
      res.json({ error: "error" });
      return;
    }

    res.json({ success: "success", data: { affected_rows: results } });
  });
});
router.delete("/:id", function(req, res) {
  if (/[0-9\,]+/.test(req.params.id))
    res.redirect("/api/users?ids=" + req.params.id);
});

module.exports = router;
