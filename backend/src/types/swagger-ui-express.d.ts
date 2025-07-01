declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';
  import type { OpenAPIV3 } from 'openapi-types';

  type SwaggerDocument = OpenAPIV3.Document;
  type SetupOptions = Record<string, unknown>;

  const swaggerUi: {
    serve: RequestHandler[];
    setup: (
      swaggerDoc: SwaggerDocument,
      customOptions?: SetupOptions,
      swaggerOptions?: SetupOptions,
      customCss?: string
    ) => RequestHandler;
  };

  export = swaggerUi;
}
