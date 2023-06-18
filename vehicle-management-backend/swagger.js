const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

const {PORT} = process.env;

dotenv.config();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];
const doc = {
    info: {
        version: "1.0.0",
        title: "Vehicle Tracking Management API",
        description: "Vehicle Tracking Management APIs documentation",
        contact: {
            email : "ciradukundaa@gmail.com",
            name : "Clarisse IRADUKUNDA"
        },
    },
    host: 'localhost:9000',
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'User',
            description: 'User related end-points'
        },
        {
            name: 'Vehicle',
            description: 'Vehicle related end-points'
        },
        {
            name: 'Car Owner',
            description: 'Car Owner related end-points'
        }
    ]
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // Your project's root file
});