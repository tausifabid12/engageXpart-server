import { Server } from "socket.io";

export const socketConnectionHandler = (io: Server) => {

    console.log('here  ||||||||||||||||||||||||||||||||||||||')
    io.on("connection", (socket: any) => {
        console.log('here 2  ||||||||||||||||||||||||||||||||||||||')
        const userId = socket.user?.id;
        if (userId) {
            socket.join(userId); // Join room with userId
            socket.on("disconnect", () => {
                console.log(`User ${userId} disconnected`);
            });
        }
    });
};
