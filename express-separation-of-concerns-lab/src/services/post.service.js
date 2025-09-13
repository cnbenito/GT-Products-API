// src/services/post.service.js

let posts = 
[
  {"id": 1, "name": "Banana", "price": 10}, 
  {"id": 2, "name": "Apple", "price": 15}, 
  {"id": 3, "name": "Orange", "price": 20}
];
let nextId = 4;


export const getAllPosts = () => {
    return posts;
};

export const getPostById = (id) => {
    return posts.find(p => p.id === id);
};

export const createPost = (postData) => {
    const newPost = { id: nextId++, ...postData };
    posts.push(newPost);
    return newPost;
};

export const updatePost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    posts[postIndex] = { ...posts[postIndex], ...postData };
    return posts[postIndex];
};

export const deletePost = (id) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return false;
    }
    posts.splice(postIndex, 1);
    return true;
};

export const patchPost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    posts[postIndex] = { ...posts[postIndex], ...postData };
    return posts[postIndex];
};