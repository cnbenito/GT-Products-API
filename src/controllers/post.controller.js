// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js'; // optional for errors

// CREATE — use the authenticated user (req.user) as author
export const createPostController = asyncHandler(async (req, res) => {
  // ensure auth middleware attached the user
  if (!req.user || !req.user.id) {
    // If you prefer, throw an ApiError(401, 'Not authenticated')
    throw new ApiError(401, 'Not authenticated');
  }

  const authorId = req.user.id;
  const { title, content } = req.body;

  // validation should already have run (validatePost)
  const postData = { title, content };

  const newPost = await postService.createPost(postData, authorId); // (postData, authorId)
  res.status(201).json(new ApiResponse(201, newPost, 'Post created successfully'));
});

// READ ALL
export const getAllPostsController = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(new ApiResponse(200, posts, 'All posts'));
});

// READ ONE
export const getPostByIdController = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json(new ApiResponse(200, post, 'Single post'));
});

// UPDATE
export const updatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postData = req.body;
    const userId = req.user.id; // Get the user ID from the middleware

    const updatedPost = await postService.updatePost(postId, postData, userId);
    res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

// DELETE
export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id; // Get the user ID from the middleware

    await postService.deletePost(postId, userId);
    res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});
