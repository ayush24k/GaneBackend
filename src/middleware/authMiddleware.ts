import { error } from "console";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;


export function authMiddleware(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(403).json({
            message: "Token Not Found"
        })
        return;
    }

    interface jwtPayload {
        verifiedAddress: string;
    }

    try {
        const authData = jwt.verify(token, jwtSecret) as jwtPayload;
        req.address = authData.verifiedAddress;

        next();
    } catch (err) {
        console.log(error);
        res.status(403).json({
            error: "Authentication failed"
        })
    }
}