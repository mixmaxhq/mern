const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

// Parse JSON requests.
app.use(bodyParser.json({
  limit: '100mb',
  type: 'application/json'
}));

app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

app.use(require('./router'));

module.exports = app;

