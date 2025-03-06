import express from "express";
import {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
} from "./subscription.controller";

const router = express.Router();

router.post("/create", createSubscription);
router.get("/", getSubscriptions);
router.get("/:id", getSubscriptionById);
router.post("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
