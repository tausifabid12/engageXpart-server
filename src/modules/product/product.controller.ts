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
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids, categoryId, categoryName, name, userId, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const idArray = ids ? ids.split(',') : []; // 👈 convert string to array

        const { products, total } = await getProductsFromDb(idArray, name, categoryName, categoryId, userId, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
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
        res.status(500).json({ message: "Error fetching ", error });
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
        res.status(500).json({ message: "Error updating ", error });
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
        res.status(500).json({ message: "Error deleting ", error });
    }
};
