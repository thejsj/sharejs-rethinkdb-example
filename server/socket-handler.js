var sharejs = require('share');
var Duplex = require('stream').Duplex;
var backend = require('./livedb-client');
var share = sharejs.server.createClient({
  backend: backend
});

var socketConnectionHandler = function (client) {
  console.log('New Connection');

  var stream = new Duplex({
    objectMode: true
  });
  stream._write = function (chunk, encoding, callback) {
    console.log('Stream:Write', JSON.stringify(chunk));
    client.send(JSON.stringify(chunk));
    return callback();
  };
  stream._read = function () {};
  stream.headers = client.upgradeReq.headers;
  stream.remoteAddress = client.upgradeReq.connection.remoteAddress;

  client.on('message', function (data) {
    console.log('Client:Message', data);
    return stream.push(JSON.parse(data));
  });
  stream.on('error', function (msg) {
    console.log('Client:Error');
    return client.close(msg);
  });
  client.on('close', function (reason) {
    console.log('Client:Close');
    stream.push(null);
    stream.emit('close');
    return client.close(reason);
  });
  stream.on('end', function () {
    console.log('Stream:End');
    return client.close();
  });
  return share.listen(stream);
};

module.exports = socketConnectionHandler;
