// src/services/post.service.js
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

// Create post (handles authorId foreign-key error)
export const createPost = async ({ title, content, authorId }) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)`,
      [title, content, authorId]
    );
    return await getPostById(result.insertId);
  } catch (err) {
    // MySQL error when foreign key references missing user
    if (err && (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW')) {
      throw new ApiError(400, 'Invalid author ID. User does not exist.');
    }
    throw err;
  }
};

// Challenge 3: get a single post with author data (JOIN)
export const getPostById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
       p.id,
       p.title,
       p.content,
       p.createdAt,
       p.authorId,
       u.username AS authorUsername,
       u.email AS authorEmail
     FROM posts p
     JOIN users u ON p.authorId = u.id
     WHERE p.id = ?`,
    [id]
  );
  if (rows.length === 0) throw new ApiError(404, 'Post not found');
  return rows[0];
};

// Challenge 3: get all posts with author data (JOIN)
export const getAllPosts = async () => {
  const [rows] = await pool.query(
    `SELECT
       p.id,
       p.title,
       p.content,
       p.createdAt,
       p.authorId,
       u.username AS authorUsername,
       u.email AS authorEmail
     FROM posts p
     JOIN users u ON p.authorId = u.id
     ORDER BY p.createdAt DESC`
  );
  return rows;
};

// Challenge 1: get all posts by authorId
export const getPostsByAuthorId = async (authorId) => {
  const [rows] = await pool.query(
    `SELECT
       p.id,
       p.title,
       p.content,
       p.createdAt,
       p.authorId,
       u.username AS authorUsername,
       u.email AS authorEmail
     FROM posts p
     JOIN users u ON p.authorId = u.id
     WHERE p.authorId = ?
     ORDER BY p.createdAt DESC`,
    [authorId]
  );
  return rows;
};

// Update post
export const updatePost = async (id, { title, content }) => {
  const [result] = await pool.query(
    `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
    [title, content, id]
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found");
  }

  return await getPostById(id);
};

// Delete post
export const deletePost = async (id) => {
  const [result] = await pool.query(`DELETE FROM posts WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found");
  }

  return { message: "Post deleted successfully" };
};
