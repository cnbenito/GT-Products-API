// src/controllers/user.controller.js
import { pool } from '../config/db.js'; // use named import if pool is named export
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

  if (result.affectedRows === 0) {
    return res.status(404).json(new ApiResponse(404, `User ${userId} not found.`));
  }

  res.status(200).json(new ApiResponse(200, `User ${userId} deleted.`));
});