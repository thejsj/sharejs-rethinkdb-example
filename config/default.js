'use strict';
/**
 * Configuration Structure
 *
 * default.js
 * - test.js
 * - development.js
 * - - staging.js
 * - - - production.js
 */
var config = {
  'rethinkdb': {
    'host': 'localhost',
    'port': 28015,
    'db': 'sharejs'
  },
  'ports': {
    'http': 8000,
    'sharejs': 8005,
  },
  'url': '127.0.0.1'
};
module.exports = config;
