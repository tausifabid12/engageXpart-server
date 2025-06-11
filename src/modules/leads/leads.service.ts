import { ILead } from "./leads.interface";
import Lead from "./leads.model";


// Create a new Lead
export const createLeadInDb = async (data: ILead) => {
    return await Lead.create(data);
};

// Get all Leads
export const getLeadsFromDb = async (
    ids?: string[],
    id?: string[],
    name?: string,
    searchQuery?: string,
    categoryId?: string,
    userId?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (userId) filter.userId = userId;
    if (id) filter._id = id;
    if (ids && ids.length > 0) filter._id = { $in: ids }; // 👈 array of Lead IDs


    if (searchQuery) filter.name = { $regex: searchQuery, $options: "i" };



    if (categoryId?.length && categoryId?.length > 2) filter.categoryId = categoryId;

    const total = await Lead.countDocuments(filter);
    const Leads = await Lead.find(filter).skip(skip).limit(limit);

    return { Leads, total };
}


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
