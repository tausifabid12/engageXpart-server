

import { ICategory } from "./category.interface";
import Category from "./category.model";

// Create a new Category
export const createCategoryInDb = async (data: ICategory) => {
    return await Category.create(data);
};

// Get all Categorys
export const getCategorysFromDb = async (
    id?: string,
    userId?: string,
    name?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (userId) {
        filter.userId = userId;
    }
    if (id) {
        filter._id = id;
    }

    const total = await Category.countDocuments(filter);
    const categories = await Category.find(filter).skip(skip).limit(limit);

    return { categories, total };
};


// Get a single Category by ID
export const getCategoryByIdFromDb = async (id: string) => {
    return await Category.findById(id);
};

// Update a Category by ID
export const updateCategoryInDb = async (id: string, data: Partial<ICategory>) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Category by ID
export const deleteCategoryFromDb = async (id: string) => {
    return await Category.findByIdAndDelete(id);
};
