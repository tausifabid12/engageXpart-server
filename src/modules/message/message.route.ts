import express from "express";
import {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
} from "./message.controller";

const router = express.Router();

router.post("/create", createMessage);
router.get("/", getMessages);
router.get("/:id", getMessageById);
router.post("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
