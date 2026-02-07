import { middleware } from "#middlewares/middleware.js";
import express from "express";
import cors from "cors"
// import dotenv from 'dotenv'

const app = express();
app.use(cors())
const port = process.env.PORT ?? "9001";

app.get("/", middleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
