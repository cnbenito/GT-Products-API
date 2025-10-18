// src/middlewares/validator.middleware.js
import { body, validationResult } from 'express-validator';

export const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('authorId').isInt({ min: 1 }).withMessage('A valid author ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, statusCode: 400, message: 'Validation error', errors: errors.array() });
    }
    next();
  },
];

export const validateComment = [
  body('text').notEmpty().withMessage('Text is required'),
  body('postId').isInt({ min: 1 }).withMessage('A valid post ID is required'),
  body('authorId').isInt({ min: 1 }).withMessage('A valid author ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, statusCode: 400, message: 'Validation error', errors: errors.array() });
    }
    next();
  },
];

// ADD THIS NEW VALIDATOR
export const validateRegistration = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required.'),
    
    body('email')
        .isEmail()
        .withMessage('A valid email is required.'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    
    // This part remains the same for all validators
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];
