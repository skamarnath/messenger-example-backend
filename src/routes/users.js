import { Router } from 'express';

import models, { Sequelize } from '../models';
import passport from 'passport';

const router = Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async function (
    req,
    res, next
  ) {
    if (req.user) {
      try {
        const users = await models.User.findAll({
          attributes: ['id', 'nickname'],
          where: {
            id: { [Sequelize.Op.not]: req.user.id }
          }
        });
        return res.send({ users });
      } catch (err) {
        // Calling #next will hand the error back to express,
        // so that the error handler defined in `app.ts` will handle.
        next(err);
      }
    } else {
      return res.status(401).send();
    }
  }
);

router.get('/:id/messages',
  passport.authenticate('jwt', { session: false }),
  async function (
    req,
    res, next
  ) {
    if (req.user) {
      try {
        const messages = await models.Message.findAll({
          attributes: ['id', 'fromId', 'toId', 'message'],
          where: {
            [Sequelize.Op.or]: [
              {
                fromId: req.user.id,
                toId: req.params.id
              },
              {
                toId: req.user.id,
                fromId: req.params.id
              }
            ]
          },
          order: ['createdAt']
        });
        return res.send({ messages });
      } catch (err) {
        // Calling #next will hand the error back to express,
        // so that the error handler defined in `app.ts` will handle.
        next(err);
      }
    } else {
      return res.status(401).send();
    }
  }
);

export default router;
