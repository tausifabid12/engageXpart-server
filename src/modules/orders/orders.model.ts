import mongoose from "mongoose";
import { IOrder } from "./orders.interface";






const OrderSchema = new mongoose.Schema<IOrder>(
    {

        userId: { type: String, required: true },
        userName: { type: String, required: true },
        customerDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String, required: true },
            profileId: { type: String, required: true, unique: true },
        },
        products: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                categoryName: { type: String, required: true },
                imageUrl: { type: [String], required: true },
                price: { type: Number, required: true },
                tax: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],

    },
    { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
