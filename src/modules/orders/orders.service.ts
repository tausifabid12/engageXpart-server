

import { IOrder } from "./orders.interface";
import Order from "./orders.model";

// Create a new Order
export const createOrderInDb = async (data: IOrder) => {
    return await Order.create(data);
};

// Get all Orders
export const getOrdersFromDb = async () => {
    return await Order.find();
};

// Get a single Order by ID
export const getOrderByIdFromDb = async (id: string) => {
    return await Order.findById(id);
};

// Update a Order by ID
export const updateOrderInDb = async (id: string, data: Partial<IOrder>) => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Order by ID
export const deleteOrderFromDb = async (id: string) => {
    return await Order.findByIdAndDelete(id);
};
