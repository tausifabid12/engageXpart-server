import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} from "./leads.controller";

const router = express.Router();

router.post("/create", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
