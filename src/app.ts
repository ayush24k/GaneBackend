import express from "express";
import dotenv from "dotenv";
dotenv.config();


import { rootRouter } from "./routes/index";
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send(`Hello world!}`);
})

app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}\nlink: http://localhost:${PORT}`);
});