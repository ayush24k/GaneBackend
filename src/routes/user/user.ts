import express from "express";
import jwt from "jsonwebtoken";
import { ethers } from 'ethers'; 
import { authMiddleware } from "../../middleware/authMiddleware";

export const userRouter = express.Router();

const jwtSecret = process.env.JWT_SECRET;


function generateNonce() {
    const nonce = new Date().getTime();
    return nonce + Math.floor(Math.random() * 10000).toString();
}

function signMessage(address:string, nonce:string) {
    return `Please sign this message ${address}:\n\n${nonce}`
}

userRouter.post("/nonce", (req, res) => {
    const {address} = req.body;

    if (!address) {
        res.status(400).json({
            Error: "address not found"
        })
        return;
    }

    const nonce = generateNonce();

    const tempToken = jwt.sign({address, nonce}, jwtSecret, {expiresIn: "120s"})
    const message = signMessage(address, nonce)

    res.json({
        tempToken: tempToken,
        message: message,
    })
})


userRouter.post("/verify", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const tempToken = authHeader && authHeader.split(" ")[1] || "";

    const {signature} = req.body;

    if (!tempToken) {
        res.status(403).json({
            message: "Not token found"
        });
        return;
    }

    interface jwtPayload {
        address: string;
        nonce: string;
    }

    const userData = jwt.verify(tempToken, jwtSecret) as jwtPayload;
    const nonce = userData.nonce;
    const address = userData.address;
    const message = signMessage(address, nonce);

    const verifiedAddress = ethers.verifyMessage(message, signature);

    if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
        const token = jwt.sign({verifiedAddress}, jwtSecret, {expiresIn: "1d"})
        res.json({
            token
        })
        return;
    } else {
        res.status(403).json({
            error: "token is not correct",
        })
        return;
    }
})

userRouter.get("/checkProtected", authMiddleware, (req, res) => {
    res.json({
        working: "asdadsa"
    })
})

