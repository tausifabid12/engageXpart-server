

import { ILead } from "./leads.interface";
import Lead from "./leads.model";

// Create a new Lead
export const createLeadInDb = async (data: ILead) => {
    return await Lead.create(data);
};

// Get all Leads
export const getLeadsFromDb = async (name?: string, categoryName?: string, categoryId?: string) => {
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

    return await Lead.find(filter);
};


// Get a single Lead by ID
export const getLeadByIdFromDb = async (id: string) => {
    return await Lead.findById(id);
};

// Update a Lead by ID
export const updateLeadInDb = async (id: string, data: Partial<ILead>) => {
    return await Lead.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Lead by ID
export const deleteLeadFromDb = async (id: string) => {
    return await Lead.findByIdAndDelete(id);
};
