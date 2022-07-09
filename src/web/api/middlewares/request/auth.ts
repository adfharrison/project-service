import { NextFunction, Request, Response } from 'express';

export type Auth = {
  user: {
    userid: string;
  };
};

export function getAuthFromRequestHeaders(headers: Request['headers']): Auth {
  return {
    user: {
      userid: headers['x-auth-userid'] as string,
    },
  };
}

export function auth() {
  return function authMiddleware(
    request: Request,
    _: Response,
    next: NextFunction
  ) {
    request.auth = getAuthFromRequestHeaders(request.headers);
    next();
  };
}
