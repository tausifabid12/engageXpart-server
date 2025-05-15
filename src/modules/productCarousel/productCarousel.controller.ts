import { Request, Response } from "express";
import { createProductCarouselInDb, deleteProductCarouselFromDb, getProductCarouselByIdFromDb, getProductCarouselsFromDb, updateProductCarouselInDb } from "./productCarousel.service";


// Create a new ProductCarousel
export const createProductCarousel = async (req: Request, res: Response): Promise<void> => {
    try {


        const ProductCarousel = await createProductCarouselInDb(req.body);


        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all ProductCarousels
export const getProductCarousels = async (_req: Request, res: Response): Promise<void> => {
    try {
        const ProductCarousels = await getProductCarouselsFromDb();
        res.status(201).json({
            success: true,
            data: ProductCarousels
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
};

// Get a single ProductCarousel by ID
export const getProductCarouselById = async (req: Request, res: Response): Promise<void> => {
    try {
        const ProductCarousel = await getProductCarouselByIdFromDb(req.params.id);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a ProductCarousel by ID
export const updateProductCarousel = async (req: Request, res: Response): Promise<void> => {
    try {
        const ProductCarousel = await updateProductCarouselInDb(req.params.id, req.body);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a ProductCarousel by ID
export const deleteProductCarousel = async (req: Request, res: Response): Promise<void> => {
    try {
        const ProductCarousel = await deleteProductCarouselFromDb(req.params.id);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
