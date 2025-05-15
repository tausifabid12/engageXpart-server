import { Request, Response } from "express";
import { createLeadInDb, deleteLeadFromDb, getLeadByIdFromDb, getLeadsFromDb, updateLeadInDb } from "./leads.service";


// Create a new Lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
    try {

        const Lead = await createLeadInDb(req.body);

        res.status(201).json({
            success: true,
            data: Lead
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Leads
export const getLeads = async (req: Request, res: Response): Promise<void> => {
    try {

        const { categoryId, categoryName, name }: any = req.query;

        const Leads = await getLeadsFromDb(name, categoryName, categoryId);
        res.status(201).json({
            success: true,
            data: Leads
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
};

// Get a single Lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Lead = await getLeadByIdFromDb(req.params.id);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Lead
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a Lead by ID
export const updateLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const Lead = await updateLeadInDb(req.params.id, req.body);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Lead
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a Lead by ID
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const Lead = await deleteLeadFromDb(req.params.id);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
