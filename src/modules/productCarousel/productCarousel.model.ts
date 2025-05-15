import mongoose from "mongoose";
import { IProductCarousel } from "./productCarousel.interface";






const ProductCarouselSchema = new mongoose.Schema<IProductCarousel>(
    {

        name: { type: String, required: true },
        carouselItems: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                link: { type: String, required: true },
                imageUrl: { type: String, required: true }
            }
        ]


    },
    { timestamps: true }
);

const ProductCarousel = mongoose.model<IProductCarousel>("ProductCarousel", ProductCarouselSchema);
export default ProductCarousel;
