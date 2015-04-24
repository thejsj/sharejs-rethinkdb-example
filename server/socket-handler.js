var sharejs = require('share');
var Duplex = require('stream').Duplex;
var backend = require('./livedb-client');
var share = sharejs.server.createClient({
  backend: backend
});

// Handle socket connections
var socketConnectionHandler = function (client) {

  var stream = new Duplex({
    objectMode: true
  });

  // Send new message to all clients
  stream._write = function (chunk, encoding, callback) {
    console.log('Stream : write -> ', JSON.stringify(chunk));
    client.send(JSON.stringify(chunk));
    return callback();
  };

  stream._read = function () {};

  stream.headers = client.upgradeReq.headers;

  stream.remoteAddress = client.upgradeReq.connection.remoteAddress;

  stream.on('error', function (msg) {
    return client.close(msg);
  });

  // When server receives message from the client
  client.on('message', function (data) {
    console.log('Client : message -> ', JSON.parse(data));
    return stream.push(JSON.parse(data));
  });

  client.on('close', function (reason) {
    stream.push(null);
    stream.emit('close');
    return client.close(reason);
  });

  stream.on('end', function () {
    return client.close();
  });

  return share.listen(stream);
};

module.exports = socketConnectionHandler;
