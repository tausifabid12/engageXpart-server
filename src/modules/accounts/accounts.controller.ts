import { Request, Response } from "express";
import { createAccountInDb, deleteAccountFromDb, getAccountByIdFromDb, getAccountsFromDb, updateAccountInDb } from "./accounts.service";


// Create a new Account
export const createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const Account = await createAccountInDb(req.body);
        res.status(201).json(Account);
    } catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Accounts
export const getAccounts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Accounts = await getAccountsFromDb();
        res.json(Accounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Account by ID
export const getAccountById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Account = await getAccountByIdFromDb(req.params.id);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Account);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Account by ID
export const updateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const Account = await updateAccountInDb(req.params.id, req.body);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Account);
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Account by ID
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const Account = await deleteAccountFromDb(req.params.id);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
