import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { login, signup } from "./handlers/auth";
import productRouter from "./routes/product";
import routePrefix from "./route-prefix";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", login);
app.post("/signup", signup);

app.use(routePrefix.product, productRouter);

export default app;
