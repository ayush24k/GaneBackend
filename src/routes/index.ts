import express from "express"
import { userRouter } from "./user/user";
import { collectionRouter } from "./collection/collection";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter );
rootRouter.use("/collection", collectionRouter)