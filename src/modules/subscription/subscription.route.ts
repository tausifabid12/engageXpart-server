import express from "express";
import {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
} from "./subscription.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createSubscription);
router.get("/", authenticateUser, getSubscriptions);
router.get("/:id", authenticateUser, getSubscriptionById);
router.post("/:id", authenticateUser, updateSubscription);
router.delete("/:id", authenticateUser, deleteSubscription);

export default router;
