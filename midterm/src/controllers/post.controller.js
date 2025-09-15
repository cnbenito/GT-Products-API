// post.controller.js
import { pool } from "../config/db.js";
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';  

export const getPosts = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
      [title, content, authorId]
    );
    res.status(201).json({ id: result.insertId, title, content, authorId });
  } catch (err) {
    next(err);
  }
};

export const deletePost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [postId]);

  if (result.affectedRows === 0) {
    return res.status(404).json(new ApiResponse(404, `Post ${postId} not found.`));
  }

  res.status(200).json(new ApiResponse(200, `Post ${postId} deleted.`));
});
