import { Request, Response } from "express";
import { createAccountInDb, deleteAccountFromDb, getAccountByIdFromDb, getAccountsFromDb, updateAccountInDb } from "./accounts.service";
import Account from "./accounts.model";

// Create a new Account
export const createAccount = async (req: Request, res: Response): Promise<void> => {
    try {


        const { profileId } = req.body;

        // Check if an account with the same profileId already exists
        const existingAccount = await Account.findOne({ profileId });

        if (existingAccount) {

            res.status(400).json({
                success: false,
                message: "This Facebook account is already linked to another account."
            });

            return; // Stop execution
        }

        const result = await createAccountInDb(req.body);

        res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
};

// Get all Accounts
export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    try {

        const {
            userId
        } = req.query;

        const Accounts = await getAccountsFromDb(userId);

        res.status(201).json({
            success: true,
            data: Accounts
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
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
        res.status(500).json({ message: "Error fetching ", error });
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
        res.status(500).json({ message: "Error updating ", error });
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
        res.status(500).json({ message: "Error deleting ", error });
    }
};
