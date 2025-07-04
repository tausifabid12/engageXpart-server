import mongoose from "mongoose";
import { ICategory } from "./category.interface";






const CategorySchema = new mongoose.Schema<ICategory>(
    {

        userId: { type: String, required: true },
        slug: { type: String },
        userSlug: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        imageUrl: { type: String },


    },
    { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
