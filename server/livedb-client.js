var Promise = require('bluebird');
var config = require('config');
// Connect to our RethinkDB database
var db = require('livedb-rethinkdb')(config.get('rethinkdb'));
var livedb = require('livedb');
var backend = Promise.promisifyAll(livedb.client(db));

module.exports = backend;
