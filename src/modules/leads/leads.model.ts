import mongoose from "mongoose";
import { ILead } from "./leads.interface";







const LeadILeadSchema = new mongoose.Schema<ILead>(
    {

        userId: { type: String },
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        profileUrl: { type: String },
        lastMessageText: { type: String },
        lastOrderDate: { type: Date },
        lastMessageDate: { type: Date },
        interestedPostIds: { type: [String], default: [] },
        interestedProductId: { type: [String], default: [] },
        isCustomer: { type: Boolean, default: false },
        orderCount: { type: Number, default: 0 },
        unseenMesageCount: { type: Number, default: 0 },
        orderIds: { type: [String], default: [] },
        address: { type: String },
        state: { type: String },
        city: { type: String },
        profileId: { type: String, unique: true },
        source: { type: String, enum: ['facebook', 'instagram'], default: 'facebook' }

    },
    { timestamps: true }
);

const Lead = mongoose.model<ILead>("LeadILead", LeadILeadSchema);
export default Lead;

