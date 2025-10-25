import * as userService from '../services/user.service.js';
import  ApiResponse  from '../utils/ApiResponse.js';
import  asyncHandler  from '../utils/asyncHandler.js';

export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(new ApiResponse(201, user, 'User created successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, 'Users fetched successfully'));
});

export const getPostsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  await userService.getUserById(userId);
  const posts = await getPostsByAuthorId(userId);
  res.status(200).json(new ApiResponse(200, posts, 'Posts by user fetched successfully'));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUser(id, req.body);
  res.status(200).json(new ApiResponse(200, updatedUser, "User updated"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);
  res.status(200).json(new ApiResponse(200, result, "User deleted"));
});
