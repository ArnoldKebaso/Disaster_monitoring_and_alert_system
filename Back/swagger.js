const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disaster Alert API',
      version: '1.0.0',
      description: 'API documentation for the Disaster Alert System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },{url: 'http://kerberos.co.ke'},
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
