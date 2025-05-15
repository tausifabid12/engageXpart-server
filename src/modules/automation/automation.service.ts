

import { IAutomation } from "./automation.interface";
import Automation from "./automation.model";

// Create a new Automation
export const createAutomationInDb = async (data: IAutomation) => {
    return await Automation.create(data);
};

// Get all Automations
export const getAutomationsFromDb = async (name?: string, categoryName?: string, categoryId?: string) => {
    const filter: any = {};

    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (categoryName) {
        filter.categoryName = { $regex: categoryName, $options: "i" };
    }


    if (categoryId?.length && categoryId?.length > 2) {
        filter.categoryId = categoryId;
    }

    return await Automation.find(filter);
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
