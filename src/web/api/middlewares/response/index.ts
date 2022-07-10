import { Application } from 'express';
import { handleNotFound } from './handle-not-found';

export function onResponse(app: Application) {
  app.use('*', handleNotFound());
}
