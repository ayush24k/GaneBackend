import express from "express";
import jwt from "jsonwebtoken"; 

export const userRouter = express();


const jwtSecret = process.env.JWT_SECRET;


function generateNonce() {
    return Math.floor(Math.random() * 10000).toString();
}

userRouter.get("/checkenc", (req, res) => {
    res.send(jwtSecret);
})


userRouter.get("/nonce", (req, res) => {
    const {address} = req.body;

    if (!address) {
        res.status(400).json({
            Error: "Address is required"
        })
    }

    const nonce = generateNonce();

    const tempToken = jwt.sign({address, nonce}, jwtSecret,  )
})