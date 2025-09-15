import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/', commentController.getAllComments);

// GET all comments for a specific post
router.get('/posts/:postId', commentController.getCommentsByPost);

// POST a new comment for a specific post
router.post('/posts/:postId', commentController.createCommentForPost);

export default router;