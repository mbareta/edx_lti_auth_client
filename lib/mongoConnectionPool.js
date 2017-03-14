'use strict';

const MongoClient = require('mongodb').MongoClient;

class MongoConnectionPool {
  constructor() {
    const self = this;

    MongoClient.connect('mongodb://localhost:27017/', (err, database) => {
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
