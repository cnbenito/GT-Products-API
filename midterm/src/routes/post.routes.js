import express from 'express';
import { createPost, getPosts, deletePost } from '../controllers/post.controller.js';
import { createCommentForPost, getCommentsByPostId } from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = express.Router();

// Post routes
router.post('/', createPost);  // POST /api/posts
router.get('/', getPosts);     // GET /api/posts

// Comment routes for a specific post
router.post('/:postId/comments', validateComment, createCommentForPost);  // POST /api/posts/:postId/comments
router.get('/:postId/comments', getCommentsByPostId);                     // GET /api/posts/:postId/comments

router.delete('/:id', deletePost); // DELETE /api/posts/:id

export default router;
