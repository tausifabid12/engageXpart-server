import { Request, Response } from "express";
import { createAdminLeadInDb, createAdminLeadsInDb, deleteAdminLeadFromDb, getAdminLeadByIdFromDb, getAdminLeadsFromDb, updateAdminLeadInDb } from "./adminLeads.service";


// Create a new AdminLead
export const createAdminLead = async (req: Request, res: Response): Promise<void> => {
    try {

        const AdminLead = await createAdminLeadInDb(req.body);

        res.status(201).json({
            success: true,
            data: AdminLead
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating ", error });
    }
};


// Bulk create AdminLeads
export const createAdminLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const adminLeads = await createAdminLeadsInDb(req.body); // Expecting an array

        res.status(201).json({
            success: true,
            data: adminLeads,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error creating admin leads",
            error,
        });
    }
};

// Get all AdminLeads
export const getAdminLeads = async (req: Request, res: Response): Promise<void> => {
    try {

        const { categoryId, categoryName, name }: any = req.query;

        const AdminLeads = await getAdminLeadsFromDb(name, categoryName, categoryId);
        res.status(201).json({
            success: true,
            data: AdminLeads
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
};

// Get a single AdminLead by ID
export const getAdminLeadById = async (req: Request, res: Response): Promise<void> => {
    try {
        const AdminLead = await getAdminLeadByIdFromDb(req.params.id);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: AdminLead
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a AdminLead by ID
export const updateAdminLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const AdminLead = await updateAdminLeadInDb(req.params.id, req.body);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: AdminLead
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a AdminLead by ID
export const deleteAdminLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const AdminLead = await deleteAdminLeadFromDb(req.params.id);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
