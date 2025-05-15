import { Request, Response } from "express";
import { createCustomersInDb, deleteCustomersFromDb, getCustomersByIdFromDb, getCustomersFromDb, updateCustomersInDb } from "./customers.service";


// Create a new Customers
export const createCustomers = async (req: Request, res: Response): Promise<void> => {
    try {

        const Customers = await createCustomersInDb(req.body);

        res.status(201).json({
            success: true,
            data: Customers
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Customers
export const getCustomers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Customers = await getCustomersFromDb();
        res.status(201).json({
            success: true,
            data: Customers
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
};

// Get a single Customers by ID
export const getCustomersById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Customers = await getCustomersByIdFromDb(req.params.id);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Customers
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
};

// Update a Customers by ID
export const updateCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const Customers = await updateCustomersInDb(req.params.id, req.body);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Customers
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
};

// Delete a Customers by ID
export const deleteCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const Customers = await deleteCustomersFromDb(req.params.id);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
};
