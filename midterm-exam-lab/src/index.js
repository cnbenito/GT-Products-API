import express from 'express';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';


const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
