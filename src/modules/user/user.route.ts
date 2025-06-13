import express from "express";
import { registerUser, getUsers, loginUser, updateUser, deleteUser, getStatistics } from "./user.controller";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/statistics", getStatistics);

// router.get("/", authenticateUser, checkSubscription, getUsers);
router.get("/", getUsers);
router.post("/:userId", updateUser);
router.delete("/:id", deleteUser);

export default router;
