import mongoose from "mongoose";
import { ICustomers } from "./customers.interface";






const CustomersSchema = new mongoose.Schema<ICustomers>(
    {

        userId: { type: String, required: true },
        userName: { type: String, required: true },
        customerProfile: {
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            phone: { type: String, required: true },
            profileId: { type: String, required: true, unique: true },
        },
        customerLocation: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String, required: true },
        },
        orderStats: {
            totalOrders: { type: Number, default: 0 },
            totalSpent: { type: Number, default: 0 },
        },
        productIds: [{ type: String }],

    },
    { timestamps: true }
);

const Customers = mongoose.model<ICustomers>("Customers", CustomersSchema);
export default Customers;
