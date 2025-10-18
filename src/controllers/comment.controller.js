// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';
import  ApiResponse  from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const createComment = async (req, res, next) => {
  try {
    const { text, postId, authorId } = req.body;

    if (!text || !postId || !authorId) {
      throw new ApiError(400, "text, postId and authorId are required");
    }

    const comment = await commentService.createComment({ text, postId, authorId });
    res.status(201).json(new ApiResponse(201, comment, "Comment created"));
  } catch (err) {
    next(err);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments));
  } catch (err) {
    next(err);
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getCommentById(id);
    if (!comment) throw new ApiError(404, "Comment not found");
    res.status(200).json(new ApiResponse(200, comment));
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments));
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await commentService.updateComment(id, req.body);
    res.status(200).json(new ApiResponse(200, updatedComment, "Comment updated"));
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await commentService.deleteComment(id);
    res.status(200).json(new ApiResponse(200, result, "Comment deleted"));
  } catch (err) {
    next(err);
  }
};
