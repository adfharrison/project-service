import express, { Application, NextFunction, Request, Response } from 'express';
import swagger, { SwaggerOptions } from 'swagger-ui-express';
import schema from '../../openapi.json';
import deepmerge from 'deepmerge';

const securityScheme: SwaggerOptions = {
  components: {
    securitySchemes: {
      userId: {
        description: 'User ID',
        in: 'header',
        name: 'x-auth-userId',
        type: 'apiKey',
      },
    },
  },
  security: [
    {
      userId: [],
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

function serveSwagger({ schema }: { schema: SwaggerOptions }) {
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

export function onRequest(app: Application) {
  app.use(express.json());
  app.use('/health', (req, res) => res.status(200).send('Healthy'));
  app.get('/api-docs', (req, res) => res.redirect('api-docs/index.htm'));
  app.use('/api-docs', swagger.serve, serveSwagger({ schema }));
  app.get('/openapi.json', (req, res) => res.json(schema));
}
