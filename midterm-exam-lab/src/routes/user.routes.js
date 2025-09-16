// src/routes/user.routes.js
import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get('/:userId/posts', userController.getPostsByUser);

export default router;
