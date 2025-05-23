"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user/user");
const collection_1 = require("./collection/collection");
exports.rootRouter = express_1.default.Router();
exports.rootRouter.use("/user", user_1.userRouter);
exports.rootRouter.use("/collection", collection_1.collectionRouter);
