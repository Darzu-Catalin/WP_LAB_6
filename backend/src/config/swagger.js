const swaggerJsdoc = require('swagger-jsdoc');
const { PORT } = require('./env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Component Styler API',
      version: '1.0.0',
      description: 'CRUD API for managing component configurations with JWT authentication',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Configuration: {
          type: 'object',
          required: ['name', 'components'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            components: { type: 'array', items: { type: 'object' } },
            backgroundColor: { type: 'string' },
            savedAt: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
