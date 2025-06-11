import { IMessage } from "./message.interface";
import Message from "./message.model";


// Create a new Message
export const createMessageInDb = async (data: IMessage) => {
    return await Message.create(data);
};

// Get all Messages
export const getMessagesFromDb = async (
    ids?: string[],
    id?: string[],
    name?: string,
    searchQuery?: string,
    profileId?: string,
    userId?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (userId) filter.userId = userId;
    if (profileId) filter.contactProfileId = profileId;
    if (id) filter._id = id;
    if (ids && ids.length > 0) filter._id = { $in: ids }; // 👈 array of Message IDs


    if (searchQuery) filter.name = { $regex: searchQuery, $options: "i" };





    const total = await Message.countDocuments(filter);
    const Messages = await Message.find(filter).skip(skip).limit(limit);

    return { Messages, total };
}


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
