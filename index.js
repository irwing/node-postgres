const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

// use middleware for receive data in json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi!')
})

routerApi(app);

app.listen(port, () => {
  console.log(`Running in port: ${port}`);
})
