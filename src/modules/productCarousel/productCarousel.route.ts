import express from "express";
import {
    createProductCarousel,
    getProductCarousels,
    getProductCarouselById,
    updateProductCarousel,
    deleteProductCarousel,
} from "./productCarousel.controller";

const router = express.Router();

router.post("/create", createProductCarousel);
router.get("/", getProductCarousels);
router.get("/:id", getProductCarouselById);
router.post("/:id", updateProductCarousel);
router.delete("/:id", deleteProductCarousel);

export default router;
