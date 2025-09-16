import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const createUser = async ({ username, email }) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO users (username, email) VALUES (?, ?)`,
      [username, email]
    );
    return await getUserById(result.insertId);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new ApiError(409, 'Username or email already exists');
    }
    throw err;
  }
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, username, email, createdAt FROM users WHERE id = ?`,
    [id]
  );
  if (rows.length === 0) throw new ApiError(404, 'User not found');
  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, username, email, createdAt FROM users`
  );
  return rows;
};


export const updateUser = async (id, { username, email }) => {
  try {
    const [result] = await pool.query(
      `UPDATE users SET username = ?, email = ? WHERE id = ?`,
      [username, email, id]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(404, "User not found");
    }

    return await getUserById(id);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new ApiError(409, "Username or email already exists");
    }
    throw err;
  }
};

export const deleteUser = async (id) => {
  const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new ApiError(404, "User not found");
  }

  return { message: "User deleted successfully" };
};
