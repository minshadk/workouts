require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
// console.log(process.env.MONG_URL)
mongoose
  // .connect(process.env.MONG_URL)
  .connect("mongodb+srv://me:ThisIsPassword@cluster0.wcgux.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and runing on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
 