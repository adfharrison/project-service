import express, { Application } from 'express';

export function onRequest(app: Application) {
  app.use('/health', (req, res) => res.status(200).send('Healthy'));
}
