var express = require('express');
var shareCodeMirror = require('share-codemirror');
var r = require('rethinkdb');

var shareJSServer = require('./sharejs-server');
var socketHandler = require('./socket-handler');


// Init app
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.set('transports', ['websocket', 'polling']);

app
  .use(express.static(shareCodeMirror.scriptsDir))
  .use(express.static(__dirname + '/../client'));

shareJSServer.listen(8005);
server.listen(8000);

io.on('connection', function (socket) {
    var listenToTable = function (tableName) {
        r.connect({
          db: 'sharejs',
          host: 'localhost',
          port: 28015
        }).then(function (conn) {
          console.log(tableName);
          r.table(tableName)
           .changes()
           .run(conn)
           .then(function (cursor) {
             cursor.each(function (err, row) {
              console.log(row);
              socket.emit(tableName, row);
             });
           });
        });
    };
    listenToTable('documents');
    listenToTable('documents_ops');
});
