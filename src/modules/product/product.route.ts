import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "./product.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createProduct);
router.get("/", authenticateUser, getProducts);
router.get("/:id", authenticateUser, getProductById);
router.post("/:id", authenticateUser, updateProduct);
router.delete("/:id", authenticateUser, deleteProduct);

export default router;
