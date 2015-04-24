var config = require('config');
var express = require('express');
var shareCodeMirror = require('share-codemirror');
var r = require('./db');

var shareJSServer = require('./sharejs-server');
var socketHandler = require('./socket-handler');
var clientConfigParser = require('./client-config-parser');

// Init app
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.set('transports', ['websocket', 'polling']);

app
  .use('/config.js', clientConfigParser)
  .use(express.static(shareCodeMirror.scriptsDir))
  .use(express.static(__dirname + '/../client'));

// We need 2 ports, one for our express/socket.io server and one for ShareJS
shareJSServer.listen(config.get('ports').sharejs);
server.listen(config.get('ports').http);

// Listen to socket connections
io.on('connection', function (socket) {
    // Listen to changes on a specific table
    // Emit a socket event with the name of the table when anything changes on that table
    var listenToTable = function (tableName) {
        r.connect(config.get('rethinkdb')).then(function (conn) {
          r.table(tableName)
           .changes()
           .run(conn)
           .then(function (cursor) {
             cursor.each(function (err, row) {
              socket.emit(tableName, row);
             });
           });
        });
    };
    listenToTable('documents');
    listenToTable('documents_ops');
});
