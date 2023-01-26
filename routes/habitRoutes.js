const habitRouter = require("express").Router();

const {
  addHabit,
  addHabitDate,
  fetchAllHabits,
  deleteHabit,
} = require("../controller/habitController");

// For rendering different pages and controllers
habitRouter.get("/", fetchAllHabits);
habitRouter.post("/add-habit", addHabit);
habitRouter.delete("/delete-habit", deleteHabit);
habitRouter.post("/update-habit-date", addHabitDate);

module.exports = habitRouter;
