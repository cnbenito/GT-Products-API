let comments = [
  // Example:
  { id: 1, postId: 1, author: "Carlos", content: "Nice post!", createdAt: "2025-09-06T15:00:00Z" },
  { id: 2, postId: 2, author: "Benito", content: "Bad post!", createdAt: "2025-09-06T15:00:00Z" }
];
let nextCommentId = 1;

export const getAllComments = () => {
  return comments;
};

export const getCommentsByPostId = (postId) => {
  return comments.filter(comment => comment.postId === Number(postId));
};

export const createCommentForPost = (postId, commentData) => {
  const { author, content } = commentData;

  if (!author || !content) {
    throw new Error('Author and content are required');
  }

  const newComment = {
    id: nextCommentId++,
    postId: Number(postId),
    author,
    content,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  return newComment;
};