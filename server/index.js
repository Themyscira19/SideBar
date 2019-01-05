const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/routes");
const path = require("path");
const cors = require("cors");
const comp = require("compression");

const app = express();

// app.use(comp());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../Client/dist/")));

app.use(router);

// app.get('/', function (req, res) {
//     console.log(req.header)
//     res.sendFile(path.join(__dirname, '../Client/dist/bundle.js'))
//   });

const port = process.env.PORT || 9004;

app.listen(port, function() {
  console.log("Justin's FEC component listening on port " + port);
});
