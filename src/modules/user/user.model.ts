import mongoose from "mongoose";
import { IUser } from "./user.interface";



const UserSchema = new mongoose.Schema<IUser>(
    {
        userId: { type: String, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        businessName: { type: String, required: true },
        businessDescription: { type: String },
        isARetailer: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
