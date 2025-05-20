import express from "express";
import userRoutes from "../modules/user/user.route";
import categoryRoutes from "../modules/category/category.route";
import productRoutes from "../modules/product/product.route";
import endpointRoutes from "../modules/endpoint/endpoint.route";
import accountsRoutes from "../modules/accounts/accounts.route";
import productCarouselRoutes from "../modules/productCarousel/productCarousel.route";
import automationRoutes from "../modules/automation/automation.route";
import adminLeadsRoutes from "../modules/adminLeads/adminLeads.route";
import leadsRoutes from "../modules/leads/leads.route";
import ordersRoutes from "../modules/orders/orders.route";



const router = express.Router();

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/endpoint", endpointRoutes);
router.use("/accounts", accountsRoutes);
router.use("/product-carousel", productCarouselRoutes);
router.use("/automation", automationRoutes);
router.use("/admin-lead", adminLeadsRoutes);
router.use("/lead", leadsRoutes);
router.use("/orders", leadsRoutes);


export default router;
