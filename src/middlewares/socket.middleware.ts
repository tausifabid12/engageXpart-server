import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// ✅ Socket.IO auth middleware
export const socketAuthMiddleware = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    next: (err?: Error) => void
) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error: Token missing"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        socket.data.user = decoded;
        next();
    } catch (err) {
        return next(new Error("Authentication error: Invalid token"));
    }
};
