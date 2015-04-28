var r = require('rethinkdb');
require('rethinkdb-init')(r);
var config = require('config');

// Create database and tables
r.promise = r.init(config.get('rethinkdb'), [
    'documents',
    'document_ops'
  ])
  .then(function (conn) {
    r.conn = conn;
    r.conn.use('sharejs');
  });

module.exports = r;
