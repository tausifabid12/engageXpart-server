import express from "express";
import userRoutes from "../modules/user/user.route";
import categoryRoutes from "../modules/category/category.route";
import productRoutes from "../modules/product/product.route";



const router = express.Router();

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);


export default router;
