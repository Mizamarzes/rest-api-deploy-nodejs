const app = require('../app'); // Adjust the path if needed
const serverless = require('serverless-http');

module.exports = serverless(app);
