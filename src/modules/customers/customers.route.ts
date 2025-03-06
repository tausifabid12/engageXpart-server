import express from "express";
import {
    createCustomers,
    getCustomers,
    getCustomersById,
    updateCustomers,
    deleteCustomers,
} from "./customers.controller";

const router = express.Router();

router.post("/create", createCustomers);
router.get("/", getCustomers);
router.get("/:id", getCustomersById);
router.post("/:id", updateCustomers);
router.delete("/:id", deleteCustomers);

export default router;
