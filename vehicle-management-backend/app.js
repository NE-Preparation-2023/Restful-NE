const express = require('express');
const dotenv = require('dotenv');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose')
const routeHandler = require('./routes');
const swaggerUi = require('swagger-ui-express');
const bodyParser= require('body-parser');
const app = express();
const multer = require('multer');
const swaggerFile = require('./swagger_output.json');

const upload = multer({dest: 'uploads/'});

dotenv.config();
const {mongodbOptions} = require('./config');
const morgan = require('morgan');

const { PORT, HOST, MONGO_DEV} = process.env;

mongoose
  .connect(MONGO_DEV, mongodbOptions)
  .then(() => console.log("Successfully connected to MongoDb"))
  .catch((e) => console.log('Could not connect to Mongodb', e));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// Parse application/json
app.use(bodyParser.json());
app.use(cors({origin: '*', credentials: true}));
app.use(morgan('dev'));
app.use(expressFileUpload({
  createParentPath: true
}));

app.use('/', routeHandler);

//documentation
// const swaggerDocs = require('./swagger.json');
// app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, false, {
//   docExpansion: "none"
// }))

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res) => res.status(404).json({error: 'We cannot get what you are looking for'}));

app.listen(PORT, () => {
  console.log(`APP RUNNING ON ${HOST}:${PORT}`);
  console.log(`ACCESS API DOCS VIA ${HOST}:${PORT}/documentation `);
})

// const tls = require('tls');
// tls.DEFAULT_MIN_VERSION = 'TLSv1.2';