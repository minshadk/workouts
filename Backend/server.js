require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and runing on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
