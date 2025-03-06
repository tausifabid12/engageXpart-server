import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from "./post.controller";

const router = express.Router();

router.post("/create", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
