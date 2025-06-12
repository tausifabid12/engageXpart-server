import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.replace("Bearer ", "");

        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        // @ts-ignore
        socket.user = decoded; // Attach user to socket (like userId)

        next();
    } catch (err) {
        next(new Error("Authentication failed"));
    }
};
