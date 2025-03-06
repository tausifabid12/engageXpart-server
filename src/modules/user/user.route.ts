import express from "express";
import { registerUser, getUsers, loginUser } from "./user.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { checkSubscription } from "../../middlewares/checkSubscription.middlewate";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/", authenticateUser, getAllUsers);
router.get("/list", authenticateUser, checkSubscription, getUsers);

export default router;
