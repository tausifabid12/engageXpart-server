import { Request, Response } from "express";
import { createOrderInDb, deleteOrderFromDb, getOrderByIdFromDb, getOrdersFromDb, updateOrderInDb } from "./orders.service";


// Create a new Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {

        const Order = await createOrderInDb(req.body);

        res.status(201).json({
            success: true,
            data: Order
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Orders
export const getOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Orders = await getOrdersFromDb();
        res.status(201).json({
            success: true,
            data: Orders
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await getOrderByIdFromDb(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Order by ID
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await updateOrderInDb(req.params.id, req.body);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const Order = await deleteOrderFromDb(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
