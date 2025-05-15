import mongoose from "mongoose";
import { IProduct } from "./product.interface";






const ProductSchema = new mongoose.Schema<IProduct>(
    {

        name: { type: String, required: true },
        userId: { type: String, required: true },
        description: { type: String, required: true },
        categoryName: { type: String, required: true },
        categoryId: { type: String, required: true },
        imageUrl: { type: [String], required: true },
        stock: { type: Number, required: true },
        originalPrice: { type: String, required: true },
        offerPrice: { type: String, required: true },
        videoUrl: { type: String },
        variantNames: [{
            name: { type: String },
            imageUrl: { type: String },

        }]

    },
    { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
