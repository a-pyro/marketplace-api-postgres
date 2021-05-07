import { Router } from 'express';
import { Review } from '../db/index.js';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const revs = await Review.findAll();
    res.send(revs);
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

export default router;
