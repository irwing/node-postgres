const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const routerApi = require('./routes');

const { logErrors, errorHandler, secuelizeErrorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// use middleware to control the ips that access
const whitelist = ['http://localhost:3000', 'http://127.0.0.1'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors());

// available authentication strategies
require('./utils/auth');

// use middleware for receive data in json
app.use(express.json());

app.get('/', 
  checkApiKey,
  (req, res) => {
    res.send('Hi!')
  }
);

routerApi(app);

app.use(logErrors);
app.use(secuelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running in port: ${port}`);
})
