const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 5, maxlength: 20},
  description: {type: String, required: true, minlength: 5, maxlength: 200},
  status: Boolean,
}, {timestamps: true});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
