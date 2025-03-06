import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "./product.controller";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
