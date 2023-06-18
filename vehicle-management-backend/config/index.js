const dotenv = require('dotenv');

dotenv.config();

const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
}

module.exports = {mongodbOptions};