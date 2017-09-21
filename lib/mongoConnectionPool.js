'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('../config/main');

class MongoConnectionPool {
  constructor() {
    const self = this;

    MongoClient.connect(config.mongoUrl, (err, database) => {
      if (err) {
        throw err;
      }
      else {
        self.db = database;
      }
    });
  }

  getConnection() {
    return this.db;
  }
}

module.exports = new MongoConnectionPool();
