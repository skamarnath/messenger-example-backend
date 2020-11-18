import passport from 'passport';

import './local';
import './jwt';

export default {
  init (server) {
    server.use(passport.initialize());
  }
};
