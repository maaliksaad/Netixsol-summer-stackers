// docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
  {
    url: "https://week3-day2-backend.vercel.app",
    description: "Production server",
  },
],
  },

  apis: ["./routes/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
