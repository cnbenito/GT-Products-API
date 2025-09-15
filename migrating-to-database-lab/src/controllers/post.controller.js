// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post', error: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Update a post completely (PUT)
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// Partially update a post (PATCH)
export const patchPost = async (req, res) => {
  try {
    const patchedPost = await postService.patchPost(req.params.id, req.body);
    if (!patchedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(patchedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error patching post', error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
