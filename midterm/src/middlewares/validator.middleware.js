import { body, validationResult } from 'express-validator';


export const validateComment = [
body('text')
.trim()
.notEmpty()
.withMessage('Comment text is required.'),
body('authorId')
.isInt({ min: 1 })
.withMessage('A valid author ID is required.'),
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
next();
},
];