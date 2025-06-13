import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} from "./leads.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createLead);
router.get("/", authenticateUser, getLeads);
router.get("/:id", authenticateUser, getLeadById);
router.post("/:id", authenticateUser, updateLead);
router.delete("/:id", authenticateUser, deleteLead);

export default router;
