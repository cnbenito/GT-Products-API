import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { pool } from '../config/db.js';

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments();
  res.status(200).json(new ApiResponse(200, comments));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentService.getCommentsByPostId(postId);
  res.status(200).json(new ApiResponse(200, comments));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text, authorId } = req.body;
  const newComment = await commentService.createComment(postId, authorId, { text });
  res.status(201).json(new ApiResponse(201, newComment));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);

  if (result.affectedRows === 0) {
    return res.status(404).json(new ApiResponse(404, `Comment ${commentId} not found.`));
  }

  res.status(200).json(new ApiResponse(200, `Comment ${commentId} deleted.`));
});
