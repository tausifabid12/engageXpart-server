

import { IOrder } from "./orders.interface";
import Order from "./orders.model";

// Create a new Order
export const createOrderInDb = async (data: IOrder) => {
    return await Order.create(data);
};

// Get all Orders
export const getOrdersFromDb = async (
    filter: any = {},
    skip: number = 0,
    limit: number = 10
) => {
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter).skip(skip).limit(limit);
    return { orders, total };
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
