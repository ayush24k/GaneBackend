"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ethers_1 = require("ethers");
const authMiddleware_1 = require("../../middleware/authMiddleware");
exports.userRouter = express_1.default.Router();
const jwtSecret = process.env.JWT_SECRET;
function generateNonce() {
    const nonce = new Date().getTime();
    return nonce + Math.floor(Math.random() * 10000).toString();
}
function signMessage(address, nonce) {
    return `Please sign this message ${address}:\n\n${nonce}`;
}
exports.userRouter.post("/nonce", (req, res) => {
    const { address } = req.body;
    if (!address) {
        res.status(400).json({
            Error: "address not found"
        });
        return;
    }
    const nonce = generateNonce();
    const tempToken = jsonwebtoken_1.default.sign({ address, nonce }, jwtSecret, { expiresIn: "120s" });
    const message = signMessage(address, nonce);
    res.json({
        tempToken: tempToken,
        message: message,
    });
});
exports.userRouter.post("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const tempToken = authHeader && authHeader.split(" ")[1] || "";
    const { signature } = req.body;
    if (!tempToken) {
        res.status(403).json({
            message: "Not token found"
        });
        return;
    }
    const userData = jsonwebtoken_1.default.verify(tempToken, jwtSecret);
    const nonce = userData.nonce;
    const address = userData.address;
    const message = signMessage(address, nonce);
    const verifiedAddress = ethers_1.ethers.verifyMessage(message, signature);
    if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
        const token = jsonwebtoken_1.default.sign({ verifiedAddress }, jwtSecret, { expiresIn: "12s" });
        res.status(200).json({
            token
        });
        return;
    }
    else {
        res.status(403).json({
            error: "token is not correct",
        });
        return;
    }
}));
exports.userRouter.post("/checkToken", (req, res) => {
    const { token } = req.body;
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (verifiedToken) {
            res.status(200).json({
                message: "true"
            });
        }
    }
    catch (err) {
        res.json({
            err: err,
            message: "false"
        });
    }
});
exports.userRouter.get("/checkProtected", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({
        working: "asdadsa"
    });
});
