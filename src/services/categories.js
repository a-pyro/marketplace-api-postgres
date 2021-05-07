import { Router } from 'express';
import { Category } from '../db/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    console.log(error);
  }
});

export default router;
