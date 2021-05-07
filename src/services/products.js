import { Router } from 'express';
import { Product } from '../db/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:categoryId', async (req, res, next) => {
  try {
    const newProd = await Product.create({
      ...req.body,
      categoryId: req.params.categoryId,
    });
    res.status(201).send(newProd);
  } catch (error) {
    console.log(error);
  }
});

export default router;
