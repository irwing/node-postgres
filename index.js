const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// use middleware to control the ips that access
const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(boom.unauthorized());
    }
  }
}
app.use(cors());

// use middleware for receive data in json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi!')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running in port: ${port}`);
})
