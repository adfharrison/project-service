import { Auth } from '@web/api/middlewares/request/auth';

export declare function swaggerUi(): import('express').RequestHandler<
  import('express-serve-static-core').ParamsDictionary,
  any,
  any,
  import('qs').ParsedQs,
  Record<string, any>
>[];

declare global {
  namespace Express {
    interface Request {
      auth: Auth;
    }
  }
}
