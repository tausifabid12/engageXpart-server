import mongoose from "mongoose";
import { IAccount } from "./accounts.interface";






const AccountSchema = new mongoose.Schema<IAccount>(
    {

        userId: { type: String, required: true },
        website: { type: String, enum: ['facebook', 'instagram', 'whatsapp'], required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        accessToken: { type: String, required: true }

    },
    { timestamps: true }
);

const Account = mongoose.model<IAccount>("Account", AccountSchema);
export default Account;
