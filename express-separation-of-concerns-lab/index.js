import express from 'express';
import morgan from 'morgan';
import config from './src/config/index.js';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';

const app = express();

// ✅ Only use morgan in development
if (config.nodeEnv === 'development') {
  // Change this string to try other formats: 'combined', 'common', 'short', 'tiny'
  app.use(morgan('dev'));
}

// Middleware
app.use(express.json());

// Routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
});
