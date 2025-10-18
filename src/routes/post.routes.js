// src/routes/post.routes.js
import express from 'express';
import { createPostController, getAllPostsController, getPostByIdController, updatePost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/', createPostController);
router.get('/', getAllPostsController);
router.get('/:id', getPostByIdController);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
