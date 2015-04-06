var livedb = require('livedb');
var db = require('../livedb-rethinkdb')({
  db: 'sharejs',
  host: 'localhost',
  port: 28015
});

backend = livedb.client(db);

backend.fetchAndSubscribe('users', 'fred', function(err, data, stream) {
  // Data is simply {v:0} because the fred document doesn't exist yet.

  stream.on('data', function(op) {
    // We'll see all changes to the fred document as they happen
    console.log('Fred was edited by the operation', op);
  });
});


// This could happen from a different process / server but only if you use the
// redis driver. (Otherwise they won't see each other's changes and everything
// breaks)
backend.submit('users', 'fred', {v:0, create:{type:'json0', data:{name:'Fred'}}}, function(err) {
  // Created with data {name:'Fred'}

  // Other concurrent edits can happen too, and they'll all be merged using OT.
  // This operations says at doc['name'][4], insert characters ' Flintstone'.
  backend.submit('users', 'fred', {v:1, op:[{p:['name', 4], si:' Flintstone'}]}, function(err) {
    // users.fred now has data {name:'Fred Flintstone'}
  });
});
