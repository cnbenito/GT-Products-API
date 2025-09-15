import express from 'express';
import { createUser, getUsers, deleteUser} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser); // POST /api/users
router.get('/', getUsers);    // GET /api/users
router.delete('/:id', deleteUser); // DELETE /api/users/:id

export default router;
