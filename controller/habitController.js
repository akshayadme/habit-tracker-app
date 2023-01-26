const Habit = require("../models/Habit");

//---------Controller to fetch all Habit----------//
const fetchAllHabits = async (req, res) => {
  try {
    const habitExist = await Habit.find({});
    if (habitExist.length === 0) {
      req.flash("error_msg", "No Habits Found!");
      res.render("dashboard", { habits: [] });
    } else {
      res.render("dashboard", { habits: habitExist });
    }
  } catch (error) {
    req.flash(
      "server_error",
      "Something went wrong... Error in fetching habit!"
    );
    res.redirect("back");
  }
};

//---------Controller to Add Habit----------//
const addHabit = async (req, res) => {
  const { habit, end_date } = req.body;

  try {
    const habitExist = await Habit.findOne({ habit });

    const date = new Date();
    const todaysDate = formatDate(date);

    if (habitExist) {
      req.flash("error_msg", "Habit already exists!");
      res.redirect("back");
    } else if (end_date < todaysDate) {
      req.flash("error_msg", "You have added past date!");
      res.redirect("back");
    } else {
      const newHabit = new Habit({
        habit,
        user: "akshay",
        dates: [],
        start_date: new Date().toISOString(),
        end_date,
      });

      await newHabit.save();
      // req.flash("success_msg", "Habit created successfully!");
      res.redirect("back");
    }
  } catch (error) {
    req.flash("server_error", "Something went wrong... Error in adding habit!");
    res.redirect("back");
  }
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

//---------Controller to Add Habit Date with status----------//
const addHabitDate = async (req, res) => {
  try {
    const { habit, date, status } = req.body;

    const habitExist = await Habit.findOne({ habit });

    if (!habitExist) {
      req.flash("error_msg", "Habit doesn't exist!");
      res.redirect("back");
    } else {
      let dates = habitExist.dates;

      if (status === "unknown") {
        dates = dates.filter((el) => el.date !== date.toString());
      }

      let exist = false;

      dates.map((el) => {
        if (el.date === date.toString()) {
          exist = true;
          el.status = status;
        }
      });

      !exist && status !== "unknown" && dates.push({ date, status });

      await Habit.findByIdAndUpdate(habitExist._id, {
        dates,
      });

      req.flash("success_msg", "Habit updated successfully!");
      res.redirect("back");
    }
  } catch (error) {
    req.flash("server_error", "Something went wrong... Error in adding dates!");
    res.redirect("back");
  }
};

//---------Controller to delete individual Habit----------//
const deleteHabit = async (req, res) => {
  try {
    const id = req.query.id;
    await Habit.deleteOne({ _id: id });

    // req.flash("success_msg", "Habit deleted successfully!");
    const habitExist = await Habit.find({});
    if (habitExist.length === 0) {
      req.flash("error_msg", "No Habits Found!");
      res.render("dashboard", { habits: [] });
    } else {
      res.render("dashboard", { habits: habitExist });
    }
  } catch (error) {
    req.flash(
      "server_error",
      "Something went wrong... Error in deleting habit !"
    );
    res.redirect("back");
  }
};

module.exports = {
  addHabit,
  addHabitDate,
  fetchAllHabits,
  deleteHabit,
};
