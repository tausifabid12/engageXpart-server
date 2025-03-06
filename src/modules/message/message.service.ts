

import { IMessage } from "./message.interface";
import Message from "./message.model";

// Create a new Message
export const createMessageInDb = async (data: IMessage) => {
    return await Message.create(data);
};

// Get all Messages
export const getMessagesFromDb = async () => {
    return await Message.find();
};

// Get a single Message by ID
export const getMessageByIdFromDb = async (id: string) => {
    return await Message.findById(id);
};

// Update a Message by ID
export const updateMessageInDb = async (id: string, data: Partial<IMessage>) => {
    return await Message.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Message by ID
export const deleteMessageFromDb = async (id: string) => {
    return await Message.findByIdAndDelete(id);
};
