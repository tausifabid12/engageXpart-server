import mongoose from "mongoose";
import { ISubscription } from "./subscription.interface";





const SubscriptionSchema = new mongoose.Schema<ISubscription>(
    {
        plan: {
            type: String,
            enum: ['monthly', 'six-monthly', 'yearly'],
            required: true,
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        isActive: { type: Boolean, required: true, default: true },
        userId: { type: String, required: true, unique: true },
        userName: { type: String, required: true },
        userPhoneNumber: { type: String, required: true },
    },
    { timestamps: true }
);

const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
export default Subscription;
