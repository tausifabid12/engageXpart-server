

import { IAccount } from "./accounts.interface";
import Account from "./accounts.model";

// Create a new Account
export const createAccountInDb = async (data: IAccount) => {
    return await Account.create(data);
};

// Get all Accounts
export const getAccountsFromDb = async (userId: any) => {

    let query: any = {};

    if (userId) {
        query.userId = userId
    }


    return await Account.find(query);
};

// Get a single Account by ID
export const getAccountByIdFromDb = async (id: string) => {
    return await Account.findById(id);
};

// Update a Account by ID
export const updateAccountInDb = async (id: string, data: Partial<IAccount>) => {
    return await Account.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Account by ID
export const deleteAccountFromDb = async (id: string) => {
    // return await Account.findByIdAndDelete(id);
    return await Account.deleteMany({});
};
