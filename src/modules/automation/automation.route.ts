import express from "express";
import {
    createAutomation,
    getAutomations,
    getAutomationById,
    updateAutomation,
    deleteAutomation,
} from "./automation.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createAutomation);
router.get("/", authenticateUser, getAutomations);
router.get("/:id", authenticateUser, getAutomationById);
router.post("/:id", authenticateUser, updateAutomation);
router.delete("/:id", authenticateUser, deleteAutomation);

export default router;
