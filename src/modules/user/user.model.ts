import mongoose from "mongoose";
import { IUser } from "./user.interface";



const UserSchema = new mongoose.Schema<IUser>(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String },
        businessName: { type: String },
        slug: { type: String },
        businessDescription: { type: String },
        logoUrl: { type: String },
        coverImageUrl: { type: String },
        businessContactNumber: { type: String },
        supportNumber: { type: String },
        businessEmail: { type: String },
        facebookUrl: { type: String },
        linkedInUrl: { type: String },
        instagramUrl: { type: String },
        youtubeUrl: { type: String },
        websiteUrl: { type: String },
        businessType: { type: String },
        openingTime: { type: String },
        closingTime: { type: String },
        userType: { type: String, enum: ['admin', 'superAdmin', 'agent', 'support', 'consumer'], default: "consumer" },
        isARetailer: { type: Boolean, default: false },
        isFacebookConnected: { type: Boolean, default: false },
        paymentInfo: {
            type: [{
                paymentOperatorName: { type: String },
                paymentAccountType: {
                    type: String,
                    enum: ['agent', 'personal', 'merchant'],
                },
                accountNumber: { type: String }
            }], default: []
        }
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
