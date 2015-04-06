var Promise = require('bluebird');
var liveDBRethinkDB = require('../../livedb-rethinkdb/');
var livedb = require('livedb');
var db = liveDBRethinkDB({
  db: 'sharejs',
  port: 28015,
  host: 'localhost'
});
var backend = Promise.promisifyAll(livedb.client(db));

module.exports = backend;
