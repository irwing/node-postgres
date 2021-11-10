const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// use middleware to control the ips that access
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
