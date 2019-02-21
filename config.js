'use strict';

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'mongodb://donna:fr3dd13Cat@ds159772.mlab.com:59772/storycrumb-prod';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  'mongodb://donna:test123@ds155252.mlab.com:55252/story-crumb';
exports.PORT = process.env.PORT || 5000;
