// src/middlewares/errorHandler.middleware.js
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err); // log for debugging

    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err instanceof ApiError ? err.message : "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
