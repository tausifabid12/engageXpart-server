import { Request, Response } from "express";
import { createMessageInDb, deleteMessageFromDb, getMessageByIdFromDb, getMessagesFromDb, updateMessageInDb } from "./message.service";


// Create a new Message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const Message = await createMessageInDb(req.body);
        res.status(201).json(Message);
    } catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Messages
export const getMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Messages = await getMessagesFromDb();
        res.json(Messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Message by ID
export const getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Message = await getMessageByIdFromDb(req.params.id);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Message);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Message by ID
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const Message = await updateMessageInDb(req.params.id, req.body);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Message);
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Message by ID
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const Message = await deleteMessageFromDb(req.params.id);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
