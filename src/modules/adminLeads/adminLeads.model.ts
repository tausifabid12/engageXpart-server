import mongoose from "mongoose";
import { BusinessSize, IAdminLead, LeadSource, LeadStatus } from "./adminLeads.interface";






const AdminLeadSchema = new mongoose.Schema<IAdminLead>(
    {

        businessName: { type: String, required: true, trim: true },
        contactPersonName: { type: String, required: true, trim: true },
        email: { type: String, trim: true, lowercase: true, unique: true },
        phone: { type: String, trim: true, unique: true },
        whatsapp: { type: String, trim: true },
        source: { type: String, enum: Object.values(LeadSource), required: true },
        sourceUrl: { type: String, required: true, trim: true },
        businessSize: { type: String, enum: Object.values(BusinessSize), },
        status: { type: String, enum: Object.values(LeadStatus), default: LeadStatus.COLLECTED },

    },
    { timestamps: true }
);

const AdminLead = mongoose.model<IAdminLead>("AdminLead", AdminLeadSchema);
export default AdminLead;
