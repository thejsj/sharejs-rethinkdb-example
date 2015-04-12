var Promise = require('bluebird');
var config = require('config');
var liveDBRethinkDB = require('livedb-rethinkdb');
var livedb = require('livedb');
var db = liveDBRethinkDB(config.get('rethinkdb'));
var backend = Promise.promisifyAll(livedb.client(db));

module.exports = backend;
