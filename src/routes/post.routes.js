// src/routes/post.routes.js
import express from 'express';
import {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePost,
  deletePost
} from '../controllers/post.controller.js';
import { validatePost } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllPostsController);
router.get('/:id', getPostByIdController);

// Protected create route
router.post('/', authMiddleware, validatePost, createPostController);

// Update / Delete (protect if desired)
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
