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
    return await User.findOne({ phone });
};

/**
 * Create a new user
 * @param name - User's name
 * @param email - User's email
 * @param password - Plain text password
 * @returns Created user object
 */


export const createUser = async ({ userId, name, email, phone, password, businessName, businessDescription, isARetailer }: IUser) => {


    return await User.create({
        userId,
        name,
        email,
        phone,
        password,
        businessName,
        businessDescription,
        isARetailer
    });
};
