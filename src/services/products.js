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

//aggiungi prodotto con cat id
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

// rimuovi prod
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.productId } });
    res.status(200).send({ message: 'destroyed' });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.productId },
      returning: true,
    });
    res.send(product[1][0]);
  } catch (e) {
    console.log(e);
  }
});

export default router;
