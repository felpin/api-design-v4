import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(8080, () => {
  console.log("I am a server running in port 8080");
});
