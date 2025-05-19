import mongoose from "mongoose";
import { BusinessSize, IAdminLead, LeadSource, LeadStatus } from "./adminLeads.interface";








const AdminLeadSchema = new mongoose.Schema<IAdminLead>(
    {

        businessName: { type: String, required: true, trim: true },
        contactPersonName: { type: String, trim: true },
        email: { type: String, trim: true },
        phone: { type: String, trim: true },
        whatsapp: { type: String, trim: true },
        source: { type: String, enum: Object.values(LeadSource) },
        sourceUrl: { type: String, required: true, trim: true, unique: true },
        businessSize: { type: String, },
        status: { type: String, enum: Object.values(LeadStatus), default: LeadStatus.COLLECTED },

    },
    { timestamps: true }
);

const AdminLead = mongoose.model<IAdminLead>("AdminLead", AdminLeadSchema);
export default AdminLead;
