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
    return await User.findByIdAndDelete(id);
};
