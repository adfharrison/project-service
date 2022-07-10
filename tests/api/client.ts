import { makeApp } from '@web/api/app';
import supertest from 'supertest';

const globalHeaders = {
  'x-auth-userid': '000001',
};

export function makeClient() {
  const app = makeApp();

  return {
    get(endpoint: string) {
      return supertest(app).get(endpoint).set(globalHeaders);
    },

    post(endpoint: string) {
      return supertest(app).post(endpoint).set(globalHeaders);
    },
  };
}

export const client = makeClient();
