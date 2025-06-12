import mongoose from "mongoose";
import { IMessage } from "./message.interface";






const MessageSchema = new mongoose.Schema<IMessage>(
    {
        userId: { type: String, required: true },
        pageId: { type: String, required: true },
        userName: { type: String, required: false },
        contactName: { type: String, required: false },
        contactProfileUrl: { type: String, required: false },
        contactProfileId: { type: String, required: true },
        messageText: { type: String, required: false },
        imageUrls: { type: [String], required: false },
        videoUrl: { type: String, required: false },
        type: {
            type: String,
            enum: ['text', 'image', 'template', "promotion"],
            required: true,
        },
        templateData: { type: String, required: false },
        messageId: { type: String, required: false },
        isSeen: { type: Boolean, required: true, default: false },
        time: { type: String, required: true },
        echo: { type: Boolean, required: true },

    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
