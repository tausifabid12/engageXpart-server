import { Request, Response } from "express";
import { createCategoryInDb, deleteCategoryFromDb, getCategoryByIdFromDb, getCategorysFromDb, updateCategoryInDb } from "./category.service";
import { AuthRequest } from "../../types/AuthRequest";


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
export const getCategorys = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id, name, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const userId = req?.user?.id;

        const { categories, total } = await getCategorysFromDb(id, userId, name, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: categories
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
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
