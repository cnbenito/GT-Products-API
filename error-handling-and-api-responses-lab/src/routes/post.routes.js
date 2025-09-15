import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { validatePost } from '../middlewares/validator.middleware.js';

const router = Router();

// Create
router.post('/', validatePost, postController.createPost);

// Read 
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Update
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.patchPost);

// Delete
router.delete('/:id', postController.deletePost);

export default router;

