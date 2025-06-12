import { io } from "../server";

export const notifyUser = (userId: string, data: any) => {
    io.to(userId).emit("notification", data);
};