import express, { Application } from 'express';
import { serveSwagger, swaggerUi } from './swagger';
import { auth } from './auth';
import schema from '../../openapi.json';

export function onRequest(app: Application) {
  app.use(express.json());
  app.use('/health', (req, res) => res.status(200).send('Healthy'));
  app.get('/api-docs', (req, res) => res.redirect('api-docs/index.htm'));
  app.use('/api-docs', swaggerUi(), serveSwagger({ schema }));
  app.get('/openapi.json', (req, res) => res.json(schema));
  app.use(auth());
}
