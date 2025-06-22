import { Request, Response } from "express";
import { createSubscriptionInDb, deleteSubscriptionFromDb, getSubscriptionByIdFromDb, getSubscriptionsFromDb, updateSubscriptionInDb } from "./subscription.service";
import { AuthRequest } from "../../types/AuthRequest";


// Create a new Subscription
export const createSubscription = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, userPhoneNumber, userName, plan } = req.body
        const Subscription = await createSubscriptionInDb(userId, userName, userPhoneNumber, plan);
        res.status(201).json({
            success: true,
            data: Subscription
        });
        const { userId, userPhoneNumber, userName, plan } = req.body
        const Subscription = await createSubscriptionInDb(userId, userName, userPhoneNumber, plan);
        res.status(201).json({
            success: true,
            data: Subscription
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
};



export const getSubscriptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids, categoryId, id, userPhoneNumber, userName, userId, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const idArray = ids ? ids.split(',') : []; // 👈 convert string to array

        const { Subscriptions, total } = await getSubscriptionsFromDb(idArray, id, userName, userPhoneNumber, categoryId, userId, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: Subscriptions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Subscriptions", error });
        res.status(500).json({ message: "Error fetching Subscriptions", error });
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
        res.status(500).json({ message: "Error fetching ", error });
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
        res.status(500).json({ message: "Error updating ", error });
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
        res.status(500).json({ message: "Error deleting ", error });
    }
};
