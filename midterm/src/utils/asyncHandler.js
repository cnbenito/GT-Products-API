// src/utils/asyncHandler.js

// A higher-order function that wraps async route handlers
// and forwards any errors to Express's error-handling middleware
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
