import { Request, Response } from "express";
import { createAutomationInDb, deleteAutomationFromDb, getAutomationByIdFromDb, getAutomationsFromDb, updateAutomationInDb } from "./automation.service";
import { AuthRequest } from "../../types/AuthRequest";


// Create a new Automation
export const createAutomation = async (req: Request, res: Response): Promise<void> => {
    try {

        const Automation = await createAutomationInDb(req.body);

        res.status(201).json({
            success: true,
            data: Automation
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Automations
export const getAutomations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { categoryId, categoryName, name, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const userId = req?.user?.id;

        const { automations, total } = await getAutomationsFromDb(name, categoryName, categoryId, skip, limitNum, userId);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: automations
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching automations", error });
    }
};


// Get a single Automation by ID
export const getAutomationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Automation = await getAutomationByIdFromDb(req.params.id);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Automation
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a Automation by ID
export const updateAutomation = async (req: Request, res: Response): Promise<void> => {
    try {
        const Automation = await updateAutomationInDb(req.params.id, req.body);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Automation
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a Automation by ID
export const deleteAutomation = async (req: Request, res: Response): Promise<void> => {
    try {
        const Automation = await deleteAutomationFromDb(req.params.id);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
