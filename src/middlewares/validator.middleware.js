// src/middlewares/validator.middleware.js
import { body, validationResult } from 'express-validator';

// Helper to avoid repeating the same error handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  next();
};

// Validate post creation
export const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('content').trim().notEmpty().withMessage('Content is required.'),
  (req, res, next) => handleValidation(req, res, next),
];

// Validate comment — OPTION A (current behavior: requires authorId in body)
export const validateComment = [
  body('text').notEmpty().withMessage('Text is required'),
  body('postId').isInt({ min: 1 }).withMessage('A valid post ID is required'),
  body('authorId').isInt({ min: 1 }).withMessage('A valid author ID is required'),
  (req, res, next) => handleValidation(req, res, next),
];

/* 
 // Recommended: OPTION B (preferred if comment creation route is protected by authMiddleware)
 // Use this if the route is protected and you want the server to get author from req.user
 export const validateComment = [
   body('text').notEmpty().withMessage('Text is required'),
   body('postId').isInt({ min: 1 }).withMessage('A valid post ID is required'),
   (req, res, next) => handleValidation(req, res, next),
 ];
*/

// Registration validator
export const validateRegistration = [
  body('username').trim().notEmpty().withMessage('Username is required.'),
  body('email').isEmail().withMessage('A valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  (req, res, next) => handleValidation(req, res, next),
];

// <-- NEW: Login validator (this fixes the import error) -->
export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  (req, res, next) => handleValidation(req, res, next),
];
