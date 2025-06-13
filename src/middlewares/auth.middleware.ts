import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: any;
}

/**
 * Middleware to check JWT token
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;

        next(); // Ensure next() is always called without returning anything
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

