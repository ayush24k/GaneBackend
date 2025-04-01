import express from "express"
import { userRouter } from "./user/user";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter );