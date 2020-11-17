import 'dotenv/config';

import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import _debug from 'debug';

import db from './models';

import indexRouter from './routes/index';

const debug = _debug('backend:server');

export default function () {
  const app = express();

  /**
 * Normalize a port into a number, string, or false.
 */

  function normalizePort (val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
    // named pipe
      return val;
    }

    if (port >= 0) {
    // port number
      return port;
    }

    return false;
  }

  /**
 * Event listener for HTTP server "error" event.
 */

  function onError (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const port = app.get('port');

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
      // eslint-disable-next-line no-console
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
      // eslint-disable-next-line no-console
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  }

  /**
 * Event listener for HTTP server "listening" event.
 */

  function onListening () {
    const addr = app.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  return {
    async create () {
      // set all the server things
      app.set('env', process.env.NODE_ENV);
      app.set('port', normalizePort(process.env.PORT) || '3000');

      app.use(cors());

      app.use(logger('dev'));
      app.use(json());
      app.use(urlencoded({ extended: false }));

      await db.sequelize.sync();

      app.use('/', indexRouter);
    },
    start () {
      const port = app.get('port');
      app.on('error', onError);
      app.on('listening', onListening);

      app.listen(port, function () {
        // eslint-disable-next-line no-console
        console.log('Express server listening on - http://localhost:' + port);
      });
    }
  };
};
