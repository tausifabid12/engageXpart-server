import { Request, Response } from "express";
import { createPostInDb, deletePostFromDb, getPostByIdFromDb, getPostsFromDb, updatePostInDb } from "./post.service";


// Create a new Post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const Post = await createPostInDb(req.body);
        res.status(201).json(Post);
    } catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
};

// Get all Posts
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Posts = await getPostsFromDb();
        res.json(Posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
};

// Get a single Post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const Post = await getPostByIdFromDb(req.params.id);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
};

// Update a Post by ID
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const Post = await updatePostInDb(req.params.id, req.body);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Post);
    } catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
};

// Delete a Post by ID
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const Post = await deletePostFromDb(req.params.id);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
};
