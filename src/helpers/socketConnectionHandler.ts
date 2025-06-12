import { Server } from "socket.io";

export const socketConnectionHandler = (io: Server) => {
    io.on("connection", (socket: any) => {
        const userId = socket.user?.userId;
        console.log(userId)

        if (userId) {
            socket.join(userId); // Join room with userId
            console.log(`User ${userId} connected (socket ID ===============================   : ${socket.id})`);

            socket.on("disconnect", () => {
                console.log(`User ${userId} disconnected`);
            });
        }
    });
};
