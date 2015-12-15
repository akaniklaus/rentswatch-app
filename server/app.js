/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config  = require('./config/environment');
var sqldb   = require('./sqldb');
// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

sqldb.mysql.connect(function(err) {
  if(err) {
    console.error('Error connecting to MySQL: ' + err.stack);
  } else {
    console.log('MySQL connected as id ' + sqldb.mysql.threadId);
  }
});

// Expose app
exports = module.exports = app;
