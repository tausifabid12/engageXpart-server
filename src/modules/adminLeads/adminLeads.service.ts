

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
// Get all AdminLeads with pagination and newest first
export const getAdminLeadsFromDb = async (
    name?: string,
    categoryName?: string,
    categoryId?: string,
    page: number = 1,
    limit: number = 10
) => {
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

    const skip = (page - 1) * limit;

    const data = await AdminLead.find(filter)
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(limit);

    const total = await AdminLead.countDocuments(filter);

    return {
        data,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
    };
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
