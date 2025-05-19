

import { IAdminLead } from "./adminLeads.interface";
import AdminLead from "./adminLeads.model";

// Create a new AdminLead
export const createAdminLeadInDb = async (data: IAdminLead) => {
    return await AdminLead.create(data);
};

// Create multiple AdminLeads
export const createAdminLeadsInDb = async (data: IAdminLead[]) => {
    return await AdminLead.insertMany(data);
};

// Get all AdminLeads
export const getAdminLeadsFromDb = async (name?: string, categoryName?: string, categoryId?: string) => {
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

    return await AdminLead.find(filter);
};


// Get a single AdminLead by ID
export const getAdminLeadByIdFromDb = async (id: string) => {
    return await AdminLead.findById(id);
};

// Update a AdminLead by ID
export const updateAdminLeadInDb = async (id: string, data: Partial<IAdminLead>) => {
    return await AdminLead.findByIdAndUpdate(id, data, { new: true });
};

// Delete a AdminLead by ID
export const deleteAdminLeadFromDb = async (id: string) => {
    return await AdminLead.findByIdAndDelete(id);
};
