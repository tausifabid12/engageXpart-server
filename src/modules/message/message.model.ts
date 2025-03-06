import mongoose from "mongoose";
import { IMessage } from "./message.interface";






const MessageSchema = new mongoose.Schema<IMessage>(
    {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        receiverAccountId: { type: String, required: true },
        senderAccountId: { type: String, required: true },
        senderName: { type: String, required: true },
        messageText: { type: String, required: true },
        imageUrl: { type: String, required: false },
        videoUrl: { type: String, required: false },
        type: { type: String, enum: ['text', 'image', 'template'], required: true }

    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
