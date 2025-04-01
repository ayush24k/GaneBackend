import express from "express";
import jwt from "jsonwebtoken"; 

export const userRouter = express();

const jwtSecret = process.env.JWT_SECRET;


function generateNonce() {
    return Math.floor(Math.random() * 10000).toString();
}

function signMessage(address:string, nonce:string) {
    return `Please sign this message ${address}:\n\n${nonce}`
}

userRouter.post("/nonce", (req, res) => {
    const {address} = req.body;

    if (!address) {
        res.status(400).json({
            Error: "Address is required"
        })
    }

    const nonce = generateNonce();

    const tempToken = jwt.sign({address, nonce}, jwtSecret, {expiresIn: "120s"})
    const message = signMessage(address, nonce)

    res.json({
        tempToken: tempToken,
        message: message,
    })
})

