var express = require('express');
var shareJSServer = require('./sharejs-server');

// Init app
var app = express();

app
  .use(express.static(__dirname + '/../client'))
  .listen(8000, function () {
    console.log('Server listening on port:', 8000);
  });

shareJSServer.listen(8005);
