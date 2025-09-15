import express from 'express';
import { getAllComments, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/', getAllComments);
router.delete('/:id', deleteComment); // DELETE /api/comments/:id

export default router;