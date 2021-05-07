import { Router } from 'express';
import { Review } from '../db/index.js';
const router = Router();

router.post('/:productId/:userId', async (req, res, next) => {
  try {
    const rev = await Review.create({
      ...req.body,
      productId: req.params.productId,
      userId: req.params.userId,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
