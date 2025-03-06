import express from "express";
import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
} from "./accounts.controller";

const router = express.Router();

router.post("/create", createAccount);
router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
