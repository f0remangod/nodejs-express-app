const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

/**
 * Middlewares
 */

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

/**
 * Routers
 */

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

/**
 * Handling of non-existent routes
 */

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

/**
 * Handling server errors
 */

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
