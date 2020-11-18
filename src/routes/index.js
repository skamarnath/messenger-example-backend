import { Router } from 'express';

import authRouter from './auth';
import usersRouter from './users';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json(
    { title: 'Express' }
  );
});

export default router;
