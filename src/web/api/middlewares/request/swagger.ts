import { NextFunction, Request, Response } from 'express';
import swagger, { SwaggerOptions } from 'swagger-ui-express';
import deepmerge from 'deepmerge';

const securityScheme: SwaggerOptions = {
  components: {
    securitySchemes: {
      userid: {
        description: 'User ID',
        in: 'header',
        name: 'x-auth-userid',
        type: 'apiKey',
      },
    },
  },
  security: [
    {
      userid: [],
    },
  ],
};

function getSwaggerBasePath(path?: string) {
  if (path) {
    return path.slice(0, path.indexOf('/api-docs'));
  }
}

function makeApplySecuritySchemes() {
  return function applySecuritySchemes(options: SwaggerOptions) {
    return deepmerge(options, securityScheme);
  };
}

export function swaggerUi() {
  return swagger.serve;
}

export function serveSwagger({ schema }: { schema: SwaggerOptions }) {
  return function swaggerMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const proxyPath = getSwaggerBasePath(request.get('x-envoy-original-path'));

    if (proxyPath) {
      schema.servers[0].url = proxyPath;
    }

    swagger.setup(makeApplySecuritySchemes()(schema))(request, response, next);
  };
}
