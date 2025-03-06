

import { IPost } from "./post.interface";
import Post from "./post.model";

// Create a new Post
export const createPostInDb = async (data: IPost) => {
    return await Post.create(data);
};

// Get all Posts
export const getPostsFromDb = async () => {
    return await Post.find();
};

// Get a single Post by ID
export const getPostByIdFromDb = async (id: string) => {
    return await Post.findById(id);
};

// Update a Post by ID
export const updatePostInDb = async (id: string, data: Partial<IPost>) => {
    return await Post.findByIdAndUpdate(id, data, { new: true });
};

// Delete a Post by ID
export const deletePostFromDb = async (id: string) => {
    return await Post.findByIdAndDelete(id);
};
