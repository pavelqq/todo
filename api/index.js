const winston = require("winston");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const todos = require("./routes/todos");

winston.exceptions.handle(
  new winston.transports.Console({colorize: true, prettyprint: true}),
  new winston.transports.File({filename: "uncaughtExceptions.log"})
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({filename: "logfile.log"}));

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/todos", todos);

app.get("/", (req, res) => {
  res.send("добро пожаловать в API тудушки на ангуляре");
});

const uri = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}...`);
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB соединение установлено..."))
  .catch((error) => {
      console.error("MongoDB соединение потеряно:", error.message);
    }
  );
