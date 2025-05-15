import express from "express";
import { registerUser, getUsers, loginUser, updateUser, deleteUser } from "./user.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { checkSubscription } from "../../middlewares/checkSubscription.middlewate";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/", authenticateUser, checkSubscription, getUsers);
router.get("/", getUsers);
router.post("/:userId", updateUser);
router.delete("/:id", deleteUser);

export default router;
