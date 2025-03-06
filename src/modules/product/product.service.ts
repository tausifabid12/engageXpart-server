

import { IProduct } from "./product.interface";
import Product from "./product.model";

// Create a new Product
export const createProductInDb = async (data: IProduct) => {
    return await Product.create(data);
};

// Get all Products
export const getProductsFromDb = async () => {
    return await Product.find();
};

// Get a single Product by ID
export const getProductByIdFromDb = async (id: string) => {
    return await Product.findById(id);
};

// Update a Product by ID
export const updateProductInDb = async (id: string, data: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Product by ID
export const deleteProductFromDb = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};
