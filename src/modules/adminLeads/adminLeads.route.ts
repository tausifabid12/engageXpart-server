import express from "express";
import {
    createAdminLead,
    getAdminLeads,
    getAdminLeadById,
    updateAdminLead,
    deleteAdminLead,
} from "./adminLeads.controller";

const router = express.Router();

router.post("/create", createAdminLead);
router.get("/", getAdminLeads);
router.get("/:id", getAdminLeadById);
router.post("/:id", updateAdminLead);
router.delete("/:id", deleteAdminLead);

export default router;
