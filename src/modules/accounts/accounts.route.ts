import express from "express";
import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
} from "./accounts.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createAccount);
router.get("/", authenticateUser, getAccounts);
router.get("/:id", authenticateUser, getAccountById);
router.post("/:id", authenticateUser, updateAccount);
router.delete("/:id", authenticateUser, deleteAccount);

export default router;
