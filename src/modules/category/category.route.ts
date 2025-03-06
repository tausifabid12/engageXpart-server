import express from "express";
import {
    createCategory,
    getCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "./category.controller";

const router = express.Router();

router.post("/create", createCategory);
router.get("/", getCategorys);
router.get("/:id", getCategoryById);
router.post("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
