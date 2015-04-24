var r = require('rethinkdb');
var config = require('config');

// Create database and tables
r.promise = r.connect(config.get('rethinkdb')).then(function (conn) {
  r.conn = conn;
  return r.dbCreate('sharejs')
    .run(r.conn)
    .catch(function () { })
    .then(function () {
      r.conn.use('sharejs');
      return r.tableCreate('documents').run(r.conn).catch(function () {});
    })
    .then(function () {
      return r.tableCreate('documents_ops').run(r.conn).catch(function () {});
    })
});

module.exports = r;
