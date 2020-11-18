import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import models from '../models';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'nickname',
      passwordField: 'password'
    },
    async function (nickname, password, done) {
      try {
        const user = await models.User.findOne({ where: { nickname } });
        if (!user) {
          return done(null, false, {
            message: 'User not found.'
          });
        }
        if (!(await user.authenticate(password))) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
