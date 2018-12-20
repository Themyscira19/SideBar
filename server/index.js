var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router/routes');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '../client/dist'));





app.get('/', function (req, res) {
    res.json({ message: 'Welcome Justin\'s FEC API!' });
  });
  
app.use(router);



var port = 9004;

app.listen(port, function () {
  console.log('Justin\'s FEC compenent listening on port ' + port);
});