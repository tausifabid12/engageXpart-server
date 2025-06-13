import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} from "./orders.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createOrder);
router.get("/", authenticateUser, getOrders);
router.get("/:id", authenticateUser, getOrderById);
router.post("/:id", authenticateUser, updateOrder);
router.delete("/:id", authenticateUser, deleteOrder);

export default router;
