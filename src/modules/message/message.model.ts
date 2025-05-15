import mongoose from "mongoose";
import { IMessage } from "./message.interface";






const MessageSchema = new mongoose.Schema<IMessage>(
    {
        userId: { type: String, },
        userName: { type: String, },
        receiverProfileId: { type: String, },
        senderProfileId: { type: String, },
        senderName: { type: String, },
        messages: [
            {
                messageText: { type: String, required: false },
                imageUrl: { type: String, required: false },
                videoUrl: { type: String, required: false },
                type: { type: String, enum: ['text', 'image', 'template'], },
                messageId: { type: String, },
                isSeen: { type: Boolean, default: false },
                time: { type: String, },
                echo: { type: Boolean, }
            }
        ]

    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
