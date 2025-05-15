import mongoose from "mongoose";
import { IAutomation } from "./automation.interface";






const AutomationSchema = new mongoose.Schema<IAutomation>(
    {

        userId: { type: String, required: true },
        pageId: { type: String, required: true },
        postId: { type: String, required: true },
        postImageUrl: { type: String, required: true },
        postContent: { type: String },
        postUrl: { type: String, required: true },
        keywords: { type: [String], default: [] },
        commentReplies: { type: [String], default: [] },
        outOfStockReplies: { type: [String], default: [] },
        automationType: {
            type: String,
            enum: ["Product_automation", "content_automation"],
            required: true
        },
        productsIds: { type: [String], default: [] }

    },
    { timestamps: true }
);

const Automation = mongoose.model<IAutomation>("Automation", AutomationSchema);
export default Automation;
