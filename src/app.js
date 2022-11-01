import express from "express"
import morgan from "morgan"
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const userRouter = require("./user/router/userRouter");
const bookRouter = require("./book/Router/bookRouter");

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

module.exports = app;
