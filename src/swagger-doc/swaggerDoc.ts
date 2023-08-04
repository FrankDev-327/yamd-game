import * as swaggerJsdoc from 'swagger-jsdoc';
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Yamd Game',
        version: '1.0.0',
        description:'A simple yamd game',
        contact: {
          name: 'Francisco Javier Gonzalez Renteria',
          email:"renteriafrancisco51@gmail.com",
        },
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Local/Development server',
        },
      ],
      components: {
        securitySchemes: {
          Authorization: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
    },
    apis: ['src/routes/*.ts'],
  };

const specs = swaggerJsdoc(options);

export default specs;
