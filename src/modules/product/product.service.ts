

import { IProduct } from "./product.interface";
import Product from "./product.model";

// Create a new Product
export const createProductInDb = async (data: IProduct) => {
    return await Product.create(data);
};

// Get all Products
export const getProductsFromDb = async (name?: string, categoryName?: string, categoryId?: string, userId?: string) => {
    const filter: any = {};

    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (userId) {
        filter.userId = userId;
    }
    if (categoryName) {
        filter.categoryName = { $regex: categoryName, $options: "i" };
    }


    if (categoryId?.length && categoryId?.length > 2) {
        filter.categoryId = categoryId;
    }

    return await Product.find(filter);
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
