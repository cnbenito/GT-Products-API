import { ApiError } from '../utils/ApiError.js';

export const getPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, "Post not found"); // Throws a specific error
    }
    return rows[0];
};