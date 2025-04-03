import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


import { rootRouter } from "./routes/index";
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`Gane ka juice`);
})

app.use("/api/", rootRouter)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}\nlink: http://localhost:${PORT}`);
});