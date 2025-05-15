import express from "express";
import {
    createAutomation,
    getAutomations,
    getAutomationById,
    updateAutomation,
    deleteAutomation,
} from "./automation.controller";

const router = express.Router();

router.post("/create", createAutomation);
router.get("/", getAutomations);
router.get("/:id", getAutomationById);
router.post("/:id", updateAutomation);
router.delete("/:id", deleteAutomation);

export default router;
