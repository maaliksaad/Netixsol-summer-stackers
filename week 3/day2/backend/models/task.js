// models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
