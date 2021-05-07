import { Router } from 'express';
import { User } from '../db/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Author.destroy({ where: { id: req.params.id } });
    res.status(200).send({ message: 'destroyed' });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export default router;
