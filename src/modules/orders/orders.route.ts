import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} from "./orders.controller";

const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
