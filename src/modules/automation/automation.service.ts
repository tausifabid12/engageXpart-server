

import { IAutomation } from "./automation.interface";
import Automation from "./automation.model";

// Create a new Automation
export const createAutomationInDb = async (data: IAutomation) => {
    return await Automation.create(data);
};

// Get all Automations
export const getAutomationsFromDb = async (
    name?: string,
    categoryName?: string,
    categoryId?: string,
    skip: number = 0,
    limit: number = 10,
    userId?: string
) => {
    const filter: any = {};

    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (userId) {
        filter.userId = userId
    }
    if (categoryName) {
        filter.categoryName = { $regex: categoryName, $options: "i" };
    }
    if (categoryId?.length && categoryId?.length > 2) {
        filter.categoryId = categoryId;
    }

    const total = await Automation.countDocuments(filter);
    const automations = await Automation.find(filter).skip(skip).limit(limit);

    return { automations, total };
};


// Get a single Automation by ID
export const getAutomationByIdFromDb = async (id: string) => {
    return await Automation.findById(id);
};

// Update a Automation by ID
export const updateAutomationInDb = async (id: string, data: Partial<IAutomation>) => {
    return await Automation.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Automation by ID
export const deleteAutomationFromDb = async (id: string) => {
    return await Automation.findByIdAndDelete(id);
};
