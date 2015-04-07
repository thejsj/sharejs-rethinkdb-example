var express = require('express');
var shareJSServer = require('./sharejs-server');
var shareCodeMirror = require('share-codemirror');

// Init app
var app = express();

app
  .use(express.static(shareCodeMirror.scriptsDir))
  .use(express.static(__dirname + '/../client'))
  .listen(8000, function () {
    console.log('Server listening on port:', 8000);
  });

shareJSServer.listen(8005);
