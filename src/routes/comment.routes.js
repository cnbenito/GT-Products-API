// src/routes/comment.routes.js
import { Router } from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateComment,
  deleteComment
} from '../controllers/comment.controller.js';

const router = Router();

router.post('/', createComment);
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.get('/post/:postId', getCommentsByPostId);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
