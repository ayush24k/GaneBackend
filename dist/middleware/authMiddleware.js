"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const console_1 = require("console");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(403).json({
            message: "Token Not Found"
        });
        return;
    }
    try {
        const authData = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.address = authData.verifiedAddress;
        next();
    }
    catch (err) {
        console.log(console_1.error);
        res.status(403).json({
            error: "Authentication failed"
        });
    }
}
