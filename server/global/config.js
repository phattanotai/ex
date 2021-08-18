// pg config
var exportData = {};
var {
  Pool,
  Client
} = require('pg');

var config = {
  host: '150.107.31.9',
  user: 'postgres',
  password: 'XE82>c9Wt[Hn#3)jB^M4',
  database: 'expressdb',
  port: 2432
};

var pool = new Pool(config);
var client = new Client(config);

exportData.pool = pool;
exportData.client = client;
exportData.DBConfig = config;

module.exports = exportData;