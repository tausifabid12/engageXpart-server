import { Request, Response } from "express";
import { createSubscriptionInDb, deleteSubscriptionFromDb, getSubscriptionByIdFromDb, getSubscriptionsFromDb, updateSubscriptionInDb } from "./subscription.service";


// Create a new Subscription
export const createSubscription = async (req: Request, res: Response): Promise<void> => {
    try {
        const Subscription = await createSubscriptionInDb(req.body);
        res.status(201).json(Subscription);
    } catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Subscriptions
export const getSubscriptions = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Subscriptions = await getSubscriptionsFromDb();
        res.json(Subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Subscription by ID
export const getSubscriptionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Subscription = await getSubscriptionByIdFromDb(req.params.id);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Subscription);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Subscription by ID
export const updateSubscription = async (req: Request, res: Response): Promise<void> => {
    try {
        const Subscription = await updateSubscriptionInDb(req.params.id, req.body);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Subscription);
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Subscription by ID
export const deleteSubscription = async (req: Request, res: Response): Promise<void> => {
    try {
        const Subscription = await deleteSubscriptionFromDb(req.params.id);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
