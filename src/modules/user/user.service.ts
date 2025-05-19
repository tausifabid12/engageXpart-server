import { IUser } from "./user.interface";
import User from "./user.model";


/**
 * Find a user by email
 * @param email - User's email
 * @returns User object or null
 */
export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};
export const findUserByPhone = async (phone: string) => {

    console.log(phone, 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    return await User.find({ phone });
};




// Get all Products
export const getUserFromDb = async (
    id?: string,
    userId?: string,
    businessName?: string,
    slug?: string,
    name?: string,
    phone?: string,
    userType?: string,
    skip: number = 0,
    limit: number = 10
) => {
    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (userId) filter.userId = userId;
    if (id) filter._id = id;
    if (phone) filter.phone = phone;
    if (userType) filter.userType = userType;
    if (businessName) filter.businessName = { $regex: businessName, $options: "i" };
    if (slug) filter.slug = { $regex: slug, $options: "i" };


    const total = await User.countDocuments(filter);
    const users = await User.find(filter).skip(skip).limit(limit);

    return { users, total };
};



/**
 * Create a new user
 * @param name - User's name
 * @param email - User's email
 * @param password - Plain text password
 * @returns Created user object
 */


export const createUser = async (payload: IUser) => {


    return await User.create(payload);
};




// Update a Product by ID
export const updateUserInDb = async (userId: string, data: Partial<IUser>) => {
    return await User.findOneAndUpdate({ userId }, data, { new: true });
};

// Delete a Product by ID
export const deleteUserFromDb = async (id: string) => {
    // return await User.findByIdAndDelete(id);
    return await User.deleteMany({});
};
