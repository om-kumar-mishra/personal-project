process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.disable('x-powered-by');

const morgan = require("morgan");
app.use(morgan("combined"));

const port = process.env.NODE_PORT || 3000;

const html = __dirname + "/dist";
app
  .use(bodyParser.json())
  // Static content
  .use(express.static(html))
  // Default route
  .use("*", function (req, res) {
    res.sendFile(html + "/index.html");
  })
  // Start server
  .listen(port, function () {
    console.log("Port: " + port);
    console.log("Html: " + html);
  });
