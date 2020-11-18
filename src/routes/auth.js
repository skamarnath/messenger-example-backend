import { Router } from 'express';

import models from '../models';
import passport from 'passport';

const router = Router();

function userWithJWTSerializer (user) {
  return {
    id: user.id,
    nickname: user.nickname,
    jwt: user.generateJWT()
  };
}

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (error, user, message) {
    if (user) {
      res.status(200).json(userWithJWTSerializer(user));
    } else {
      if (error) {
        res.status(500).json({
          message: error
        });
        return;
      }
      res.status(401).json(message);
    }
  })(req, res, next);
});

router.post('/signup', async (req, res) => {
  const params = { ...req.body };
  const passwordDigest = params.password;
  delete params.password;
  try {
    const user = await models.User.create({
      passwordDigest,
      ...params
    });
    res.status(200).json(userWithJWTSerializer(user));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(403).json({ error: error });
  }
});

export default router;
