const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/routes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Client/dist/')));

app.use(router);

app.get('/', function (req, res) {
    res.json({ message: 'Welcome to Justin\'s FEC API!' });
  });

const port = process.env.PORT || 9004;

app.listen(port, function () {
  console.log('Justin\'s FEC component listening on port ' + port);
});