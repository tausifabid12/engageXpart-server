import { Server, Socket } from "socket.io";

export const socketConnectionHandler = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        const user = socket.data.user;
        const userId = user?.userId;

        if (userId) {
            socket.join(userId);
            console.log(`🔌 User connected: ${userId}`);
        }

        socket.on("send_message_to_user", ({ toUserId, message }) => {
            io.to(toUserId).emit("new_message", {
                from: userId,
                message,
            });
        });

        socket.on("broadcast_notification", (notification) => {
            io.emit("new_notification", notification);
        });

        socket.on("send_notification_to_user", ({ toUserId, notification }) => {
            io.to(toUserId).emit("new_notification", notification);
        });

        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${userId}`);
        });
    });
};
