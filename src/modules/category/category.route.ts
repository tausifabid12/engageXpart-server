import express from "express";
import {
    createCategory,
    getCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "./category.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createCategory);
router.get("/", authenticateUser, getCategorys);
router.get("/:id", authenticateUser, getCategoryById);
router.post("/:id", authenticateUser, updateCategory);
router.delete("/:id", authenticateUser, deleteCategory);

export default router;
