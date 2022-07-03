import express from 'express';
import * as middlewares from '@web/api/middlewares';

export function makeApp() {
  const app = express();

  middlewares.onRequest(app);

  return app;
}
