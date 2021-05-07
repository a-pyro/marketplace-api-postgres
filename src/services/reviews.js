import { Router } from 'express';
import { Review, Product, User, Category } from '../db/index.js';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const revs = await Review.findAll();
    res.send(revs);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findAll({
      where: { id: req.params.reviewId },
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
    res.send(review);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:productId/:userId', async (req, res, next) => {
  try {
    const rev = await Review.create({
      ...req.body,
      productId: req.params.productId,
      userId: req.params.userId,
    });

    res.status(200).send(product);
    res.send(rev);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:reviewId', async (req, res, next) => {
  try {
    await Review.destroy({ where: { id: req.params.reviewId } });
    res.status(200).send({ message: 'destroyed' });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.update(req.body, {
      where: { id: req.params.reviewId },
      returning: true,
      include: [{ model: User }],
    });
    const returning = await Review.findAll({
      where: { id: review[1][0].id },
      include: [{ model: User }, { model: Product }],
      attributes: { exclude: ['userId', 'productId'] },
    });
    res.send(returning);
  } catch (e) {
    console.log(e);
  }
});

export default router;
