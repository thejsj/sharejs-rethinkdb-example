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
    'db': 'image_pin'
  },
  'ports': {
    'http': 8000,
  },
  'url': '127.0.0.1',
  'googleAnaylitcsUACode': false,
  'github': {
    'clientID': '8b3c66a88c3ca0264ff1',
    'clientSecret': '62d1bfb8e132ab74556baadac90320bcdbf39a12',
  }
};
module.exports = config;
