import * as commentService from '../services/comment.service.js';
import * as postService from '../services/post.service.js'; // To validate post existence

export const getAllComments = (req, res) => {
  res.json(commentService.getAllComments());
};

export const getCommentsByPost = (req, res) => {
  const { postId } = req.params;
  const post = postService.getPostById(Number(postId));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const comments = commentService.getCommentsByPostId(postId);
  res.json(comments);
};

export const createCommentForPost = (req, res) => {
  const { postId } = req.params;
  const post = postService.getPostById(Number(postId));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  try {
    const newComment = commentService.createCommentForPost(postId, req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};