// src/middlewares/errorHandler.middleware.js
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || "Internal Server Error";

    // If it is an ApiError, use its status
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({
        error: message
    });
};
