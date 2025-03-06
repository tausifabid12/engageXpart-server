import { Request, Response } from "express";
import { createProductInDb, deleteProductFromDb, getProductByIdFromDb, getProductsFromDb, updateProductInDb } from "./product.service";


// Create a new Product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const Product = await createProductInDb(req.body);

        res.status(201).json({
            success: true,
            data: Product
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Products
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Products = await getProductsFromDb();
        res.status(201).json({
            success: true,
            data: Products
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Product = await getProductByIdFromDb(req.params.id);
        if (!Product) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Product
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Product by ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const Product = await updateProductInDb(req.params.id, req.body);
        if (!Product) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Product
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Product by ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const Product = await deleteProductFromDb(req.params.id);
        if (!Product) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
