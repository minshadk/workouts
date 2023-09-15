const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts
// const getWorkouts = async (req, res) => {
//   const user_id = req.user._id;
//   console.log(user_id);

//   const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

//   console.log(workouts);

//   res.status(200).json(workouts);
//   // 650090fbbda3d3c0afaa143b
// };

// const ObjectId = require("mongoose").Types.ObjectId; // Import the ObjectId class

// const getWorkouts = async (req, res) => {
//   try {
//     const userId = req.user?._id;
//     if (!userId) {
//       console.log("No user id provided.");
//       return res.status(400).json({ error: "User ID not provided." });
//     }

//     console.log(userId);

//     const workouts = await Workout.find({ user_id: new ObjectId(userId) }).sort(
//       { createdAt: -1 }
//     );

//     console.log(workouts);

//     res.status(200).json(workouts);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching workouts." });
//   }
// };

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  console.log(user_id);

  // const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  // console.log(workouts);

  // res.status(200).json(workouts);

  try {
    // Find all workouts that match the provided user_id
    // const workouts = await Workout.find({ user_id });
    const workouts = await Workout.find();
    console.log(workouts);

    if (workouts.length === 0) {
      return res
        .status(404)
        .json({ message: "No workouts found for this user." });
    }
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add to the database
  try {
    console.log(req.user);
    const user_id = req.user;
    console.log(user_id);
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
