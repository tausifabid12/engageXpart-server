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


export const createAdminLeads = async (req: Request, res: Response): Promise<void> => {
    const inputLeads = req.body; // Expecting an array
    const createdLeads = [];
    const failedLeads = [];

    for (const lead of inputLeads) {
        try {
            const created = await createAdminLeadsInDb([lead]); // assuming this accepts an array
            createdLeads.push(created[0]); // assuming it returns an array
        } catch (err: any) {
            failedLeads.push({ lead, error: err.message || err });
        }
    }

    res.status(207).json({ // 207 = Multi-Status (partial success)
        success: true,
        created: createdLeads,
        failed: failedLeads,
    });
};


// Get all AdminLeads
export const getAdminLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId, categoryName, name, page = "1", limit = "10", employee }: any = req.query;

        console.log(employee)

        const paginationPage = parseInt(page, 10);
        const paginationLimit = parseInt(limit, 10);

        const result = await getAdminLeadsFromDb(name, categoryName, categoryId, paginationPage, paginationLimit, employee);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching AdminLeads", error });
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
