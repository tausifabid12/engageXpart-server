import { Request, Response } from "express";
import { createCategoryInDb, deleteCategoryFromDb, getCategoryByIdFromDb, getCategorysFromDb, updateCategoryInDb } from "./category.service";


// Create a new Category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {


        const Category = await createCategoryInDb(req.body);


        res.status(201).json({
            success: true,
            data: Category
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Categorys
export const getCategorys = async (req: Request, res: Response): Promise<void> => {
    try {

        const { id, userId, name, }: any = req.query;
        const Categorys = await getCategorysFromDb(id, userId, name);
        res.status(201).json({
            success: true,
            data: Categorys
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
};

// Get a single Category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Category = await getCategoryByIdFromDb(req.params.id);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Category
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a Category by ID
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const Category = await updateCategoryInDb(req.params.id, req.body);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Category
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a Category by ID
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const Category = await deleteCategoryFromDb(req.params.id);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
