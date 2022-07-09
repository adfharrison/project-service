import express from 'express';
import * as middlewares from '@web/api/middlewares';
import thingsController from './controllers/controller';

export function makeApp() {
  const app = express();

  middlewares.onRequest(app);

  app.use(thingsController({ router: express.Router() }));

  return app;
}
