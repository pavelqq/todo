const winston = require("winston");
const { Todo } = require("../models/todo");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// getAll (все тудушки)
router.get("/all", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.send(todos);
  } catch (error) {
    res.status(500).send("Ошибка: " + error.message);

    winston.error(error.message);
  }
});

// get (туду по id)
router.get("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.send(todo);
  } catch (error) {
    res.status(500).send("Ошибка: " + error.message);

    winston.error(error.message);
  }
});

// create (создать тудушку)
router.post("/", async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(20).required(),
    status: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { title, description, status } = req.body;

  let todo = new Todo({ title, description, status });

  todo = await todo.save();
  res.send(todo);
});

// update (обновить тудушку)
router.put("/:id", async (req, res) => {
  const schema = Joi.object({
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    __v: Joi.number(),
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(20).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Задание не найдено...");

  const { title, description } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );

  res.send(updatedTodo);
});

// updateStatus (изменить статус тудушки)
router.patch("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Задание не найдено...");

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      status: !todo.status,
    },
    {
      new: true,
    }
  );

  res.send(updatedTodo);
});

// delete (Удалить туду)
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Задание не найдено...");

  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

  res.send(deletedTodo);
});

// deleteAll (Удалить все тудушки)
router.delete("/", async (req, res) => {
  const todos = await Todo.find();

  if (!todos) return res.status(404).send("Задания не найдены...");

  const deletedTodos = await Todo.remove();

  res.send(deletedTodos);
});

// findByTitle (Искать тудушку по названию)
router.get("/title=", async (req, res) => {
  const title_key = req.params('title');
  try {
    const todos = await Todo.find({ title: title_key })
    res.send(todos)
  } catch (error) {
    res.status(500).send("Ошибка: " + error.message);

    winston.error(error.message);
  }
});

module.exports = router;
