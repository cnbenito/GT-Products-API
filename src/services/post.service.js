// src/services/post.service.js
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

// Create post (handles authorId foreign-key error)
export const createPost = async (postData, authorId) => {
  const { title, content } = postData;
  const [result] = await pool.query(
    'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
    [title, content, authorId]
  );
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
  return rows[0];
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

// Update post
export const updatePost = async (id, postData, userId) => { // Add userId as an argument
    const { title, content } = postData;

    // First, get the post to check for ownership
    const post = await getPostById(id); // This will throw a 404 if not found

    // AUTHORIZATION CHECK
    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to edit this post.");
    }

    // If the check passes, proceed with the update
    await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    const updatedPost = await getPostById(id);
    return updatedPost;
};

// Delete post
export const deletePost = async (id, userId) => { // Add userId as an argument
    // First, get the post to check for ownership
    const post = await getPostById(id); // This will throw a 404 if not found

    // AUTHORIZATION CHECK
    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to delete this post.");
    }
    
    // If the check passes, proceed with the deletion
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows;
};
