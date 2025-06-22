import Lead from "../leads/leads.model";
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
    contactProfileId?: string,
    categoryId?: string,
    userId?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (userId) filter.userId = userId;
    if (id) filter._id = id;
    if (ids && ids.length > 0) filter._id = { $in: ids }; // 👈 array of Message IDs
    if (contactProfileId) filter.contactProfileId = contactProfileId;
    if (categoryId?.length && categoryId?.length > 2) filter.categoryId = categoryId;

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


export const markAllMessagesAsSeen = async (
    userId: string,
    profileId: string
) => {
    try {
        console.log(userId, profileId, "=========  (((((((((((((((((((((((((")

        // ✅ Update unseenMessageCount to 0
        const leadUpdateRes = await Lead.updateOne(
            { userId, profileId },
            { $set: { unseenMesageCount: 0 } }
        );

        console.log("Lead update result:", leadUpdateRes);

        if (leadUpdateRes.matchedCount === 0) {
            console.warn("No Lead document matched the criteria.");
        }

        // ✅ Mark all unseen messages from that contact as seen
        const messageUpdateRes = await Message.updateMany(
            { userId, contactProfileId: profileId, isSeen: false },
            { $set: { isSeen: true } }
        );

        console.log("Messages marked as seen:", messageUpdateRes);

        return {
            leadUpdate: leadUpdateRes,
            messageUpdate: messageUpdateRes
        };
    } catch (error: any) {
        console.error("Error in markAllMessagesAsSeen:", error.message);
        throw new Error(`Failed to update messages: ${error.message}`);
    }
};