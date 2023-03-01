import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { login, signup } from "./handlers/auth";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", login);
app.post("/signup", signup);

app.get("/", (_req, res) => {
  res.status(200);
  res.json({ message: "Hello, express" });
});

export default app;
