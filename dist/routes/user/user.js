"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userRouter = (0, express_1.default)();
const jwtSecret = process.env.JWT_SECRET;
function generateNonce() {
    return Math.floor(Math.random() * 10000).toString();
}
function signMessage(address, nonce) {
    return `Please sign this message ${address}:\n\n${nonce}`;
}
exports.userRouter.post("/nonce", (req, res) => {
    const { address } = req.body;
    if (!address) {
        res.status(400).json({
            Error: "Address is required"
        });
    }
    const nonce = generateNonce();
    const tempToken = jsonwebtoken_1.default.sign({ address, nonce }, jwtSecret, { expiresIn: "120s" });
    const message = signMessage(address, nonce);
    res.json({
        tempToken: tempToken,
        message: message,
    });
});
