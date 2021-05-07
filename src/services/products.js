import { Router } from 'express';
import { Category, Product, Review, User } from '../db/index.js';

const router = Router();

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: { id: req.params.productId },
      include: [{ model: Category }, { model: Review }],
      attributes: { exclude: ['categoryId', 'reviewId'] },
    });
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
});

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
    const returning = await Product.findAll({
      where: { id: product[1][0].id },
      include: [{ model: Category }, { model: Review }],
      attributes: { exclude: ['categoryId', 'reviewId'] },
    });
    res.send(returning);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:productId/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [
        { model: User },
        {
          model: Product,
          include: Category,
          attributes: { exclude: ['categoryId'] },
        },
      ],
      attributes: { exclude: ['userId', 'productId'] },
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

export default router;
