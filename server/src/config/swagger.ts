import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MapleVista API Documentation',
      version: '1.0.0 ',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Application) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

// const outputFile = './swagger_output.json';
// const endpointsFiles = ['../routes/index.ts'];

// swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, options);
