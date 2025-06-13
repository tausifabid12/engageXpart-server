import express from "express";
import {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
    markMessagesSeenController,
} from "./message.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createMessage);
router.post("/mark-seen", authenticateUser, markMessagesSeenController);
router.get("/", authenticateUser, getMessages);
router.get("/:id", authenticateUser, getMessageById);
router.post("/:id", authenticateUser, updateMessage);
router.delete("/:id", authenticateUser, deleteMessage);

export default router;
