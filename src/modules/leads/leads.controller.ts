import { Request, Response } from "express";
import { createLeadInDb, deleteLeadFromDb, getLeadByIdFromDb, getLeadsFromDb, updateLeadInDb } from "./leads.service";
import { AuthRequest } from "../../types/AuthRequest";


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
export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { ids, categoryId, id, categoryName, name, userId, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const idArray = ids ? ids.split(',') : []; // 👈 convert string to array

        const { Leads, total } = await getLeadsFromDb(idArray, id, name, categoryName, categoryId, userId, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: Leads
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Leads", error });
        res.status(500).json({ message: "Error fetching Leads", error });
    }
};



// Get a single Lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Lead = await getLeadByIdFromDb(req.params.id);
        // const Lead = await getLeadByIdFromDb(req.params.id);
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
