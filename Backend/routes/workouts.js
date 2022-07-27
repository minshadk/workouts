const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "get all workout" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "get a workout" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "create a  workout" });
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete a workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "update a workout" });
});

module.exports = router;
