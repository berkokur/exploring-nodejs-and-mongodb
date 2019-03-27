const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    validate(value) {
      if (!validator.isLength(value, 5)) {
        throw new Error("Task name should include min 5 character");
      }
    }
  },
  description: {
    type: String
  },

  isDone: {
    type: Boolean,
    required: true
  }
});

// taskSchema.pos("save", function(next) {
//   const task = this;
//   if (task.isModified("description")) {
//     console.log("I worked after saved a task");
//   }

//   next();
// });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
