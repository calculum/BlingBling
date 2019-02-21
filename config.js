'use strict';

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'mongodb://dbuser:dbpass1@ds113815.mlab.com:13815/cid-with-mongoose';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  '#';
exports.PORT = process.env.PORT || 5000;
