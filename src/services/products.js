import { Router } from 'express';
import { Product } from '../db/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).send('HI!');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:authorId/:categoryId', async (req, res, next) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      authorId: req.params.authorId,
      categoryId: req.params.categoryId,
    });
    res.status(200).send(newArticle);
  } catch (error) {
    console.log(error);
  }
});

export default router;
