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
                name: { type: String },
                description: { type: String },
                categoryName: { type: String },
                imageUrl: { type: [String] },
                price: { type: Number },
                tax: { type: Number },
                quantity: { type: Number },
            },
        ],
        payment: {
            paymentMethod: { type: String, enum: ['personal', 'company'], required: true },
            paymentAccountName: { type: String, required: true },
            paymentAccountNumber: { type: String, required: true },
            paymentTypeName: { type: String, enum: ['send-money', 'payment', 'cash-out'], required: true },
            transactionId: { type: String, required: true },
            customerAccountNumber: { type: String, required: true },
        },

    },
    { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
