import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { options, secret } from '../helpers/jwt';
import models from '../models';
import passportJwtSocketIo from 'passport-jwt.socketio';

const commonOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// define the verify callback
async function verify (jwtPayload, done) {
  try {
    const user = await models.User.findOne({ where: { id: jwtPayload.userId } });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}

passport.use(
  new JwtStrategy(
    {
      ...commonOptions,
      ...options
    },
    verify
  )
);

const socketPassportVerify = passportJwtSocketIo.authorize({
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
}, verify);
export { socketPassportVerify };
