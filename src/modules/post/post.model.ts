import mongoose from "mongoose";
import { IPost } from "./post.interface";





const PostSchema = new mongoose.Schema<IPost>(
    {

        postTime: { type: Date, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String, required: true },

    },
    { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
