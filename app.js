import express, { json } from 'express';
import logger from 'morgan';

import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(json());

app.use('/', indexRouter);

export default app;
