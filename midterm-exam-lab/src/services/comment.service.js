// src/services/comment.service.js
import { pool } from '../config/db.js';
import { ApiError } from "../utils/ApiError.js";

export const createComment = async ({ text, postId, authorId }) => {
  const [result] = await pool.query(
    'INSERT INTO comments (text, postId, authorId) VALUES (?, ?, ?)',
    [text, postId, authorId]
  );
  return { id: result.insertId, text, postId, authorId };
};

export const getAllComments = async () => {
  const [rows] = await pool.query('SELECT * FROM comments');
  return rows;
};

export const getCommentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
  return rows[0];
};

export const getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
  return rows;
};

export const updateComment = async (id, { text }) => {
  const [result] = await pool.query(
    `UPDATE comments SET text = ? WHERE id = ?`,
    [text, id]
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Comment not found");
  }

  return await getCommentById(id);
};

export const deleteComment = async (id) => {
  const [result] = await pool.query(`DELETE FROM comments WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Comment not found");
  }

  return { message: "Comment deleted successfully" };
};
