

import { ICustomers } from "./customers.interface";
import Customers from "./customers.model";

// Create a new Customers
export const createCustomersInDb = async (data: ICustomers) => {
    return await Customers.create(data);
};

// Get all Customers
export const getCustomersFromDb = async () => {
    return await Customers.find();
};

// Get a single Customers by ID
export const getCustomersByIdFromDb = async (id: string) => {
    return await Customers.findById(id);
};

// Update a Customers by ID
export const updateCustomersInDb = async (id: string, data: Partial<ICustomers>) => {
    return await Customers.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Customers by ID
export const deleteCustomersFromDb = async (id: string) => {
    return await Customers.findByIdAndDelete(id);
};
