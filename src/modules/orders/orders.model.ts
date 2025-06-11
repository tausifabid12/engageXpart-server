import mongoose from "mongoose";
import { IOrder } from "./orders.interface";






const OrderSchema = new mongoose.Schema<IOrder>(
    {

        userId: { type: String },
        slug: { type: String, required: true },
        userName: { type: String },
        customerDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String, required: true },
            profileId: { type: String, required: true },
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'confirmed', 'packaging', 'in-shipping', 'delivered'],
            default: 'pending'
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
                variantName: { type: String },
                variantImageUrl: { type: String },
            },
        ],
        payment: {
            paymentOperatorName: { type: String },
            paymentAccountType: { type: String, enum: ['agent', 'personal', 'merchant'], required: true },
            accountNumber: { type: String },
            transactionId: { type: String, required: true },
            customerAccountNumber: { type: String, required: true },
            totalAmount: { type: Number, required: true },
            deliveryCharge: { type: Number, required: true },
            tax: { type: Number, required: true },
            discount: { type: Number, required: true },
        },

    },
    { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
