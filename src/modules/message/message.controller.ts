import { Request, Response } from "express";
import { createMessageInDb, deleteMessageFromDb, getMessageByIdFromDb, getMessagesFromDb, updateMessageInDb } from "./message.service";


// Create a new Message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {

        const Message = await createMessageInDb(req.body);

        res.status(201).json({
            success: true,
            data: Message
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Messages
export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids, profileId, id, searchQuery, name, userId, page = '1', limit = '10' }: any = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const idArray = ids ? ids.split(',') : []; // 👈 convert string to array

        const { Messages, total } = await getMessagesFromDb(idArray, id, name, searchQuery, profileId, userId, skip, limitNum);

        res.status(200).json({
            success: true,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: Messages
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Messages", error });
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
        res.status(201).json({
            success: true,
            data: Message
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
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
        res.status(201).json({
            success: true,
            data: Message
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ", error });
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
        res.status(500).json({ message: "Error deleting ", error });
    }
};
