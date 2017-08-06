"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");


router.get("/audio_editor", function(req, res) {
  res.json({ data: [] });
});

router.get("/super_admin", function(req, res) {
  res.json({ data: [] });
});
router.get("/moderator", function(req, res) {
  res.json({ data: [] });
});

router.get("/translator", function(req, res) {
  let dashboard = {
    id: "translator",
    // prject id = 1
    "1": {
      // language id = 16
      "16": { new: 3, for_review: "21", answer_user_questions: "32" },
      // language id = 49
      "49": { new: 9, for_review: "1", answer_user_questions: "2" },
      // language id = 48
      "48": { new: 2, for_review: "12", answer_user_questions: "5" }
    },
    // prject id = 2
    "2": {
      "16": { new: 1, for_review: "21", answer_user_questions: "2" },
      "49": { new: 6, for_review: "1", answer_user_questions: "4" },
      "48": { new: 3, for_review: "4", answer_user_questions: "5" }
    },
    // prject id = 3
    "3": {
      "16": { new: 2, for_review: "5", answer_user_questions: "6" },
      "49": { new: 7, for_review: "9", answer_user_questions: "2" },
      "48": { new: 5, for_review: "4", answer_user_questions: "5" }
    }
  };
  res.json({ data: dashboard });
});

router.get("/designer", function(req, res) {
  res.json({ data: [] });
});

router.get("/", function(req, res) {
  res.json({"error":"Which dashboard?"});
});

module.exports = router;
