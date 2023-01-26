const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    habit: {
      type: String,
      required: true,
    },

    dates: [
      {
        date: String,
        status: String,
      },
    ],
    end_date: {
      type: Date,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
