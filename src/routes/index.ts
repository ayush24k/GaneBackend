import express from "express"
import { userRouter } from "./user/user";

export const rootRouter = express();

rootRouter.use("/user", userRouter );