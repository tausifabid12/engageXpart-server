import mongoose from "mongoose";
import { IAccount } from "./accounts.interface";






const AccountSchema = new mongoose.Schema<IAccount>(
    {

        userId: { type: String },
        profileId: { type: String },
        website: { type: String, enum: ['facebook', 'instagram', 'whatsapp'] },
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        accessToken: { type: String },
        pages: [{
            id: { type: String },
            name: { type: String },
            access_token: { type: String },
        }]

    },
    { timestamps: true }
);

const Account = mongoose.model<IAccount>("Account", AccountSchema);
export default Account;
