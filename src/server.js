import express from 'express';
import cors from 'cors';
import productRoutes from './services/products.js';
import userRoutes from './services/users.js';
import categoriesRouter from './services/categories.js';
import reviewsRoutes from './services/reviews.js';
import { db } from './db/index.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/articles', productRoutes);
server.use('/users', userRoutes);
server.use('/reviews', reviewsRoutes);
server.use('/categories', categoriesRouter);

db.sync().then(() => {
  server.listen(process.env.PORT || 3002, () => {
    console.log('server is running on port ', process.env.PORT || 3002);
  });
});
