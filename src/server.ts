import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { socketAuthMiddleware } from "./middlewares/socketAuthMiddleware";
import { socketConnectionHandler } from "./helpers/socketConnectionHandler";




dotenv.config();
connectDB();
const app = express();




const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});




app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);
app.use(errorHandler);

// 🚨 Attach the middleware here
io.use(socketAuthMiddleware);

// 🔌 Then handle the connection
socketConnectionHandler(io);

export { io };






const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
