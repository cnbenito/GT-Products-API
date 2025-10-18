import * as postService from '../services/post.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createPostController = asyncHandler(async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await postService.createPost({ title, content, authorId });
  res.status(201).json(new ApiResponse(201, post, "Post created"));
});

export const getAllPostsController = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(new ApiResponse(200, posts, "All posts"));
});

export const getPostByIdController = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json(new ApiResponse(200, post, "Single post"));
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedPost = await postService.updatePost(id, req.body);
  res.status(200).json(new ApiResponse(200, updatedPost, "Post updated"));
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await postService.deletePost(id);
  res.status(200).json(new ApiResponse(200, result, "Post deleted"));
});
