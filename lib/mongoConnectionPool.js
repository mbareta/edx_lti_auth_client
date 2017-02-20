'use strict';

class MongoConnectionPool {
  constructor() {
      const MongoClient = require('mongodb').MongoClient;
      const self = this;

      MongoClient.connect('mongodb://localhost:27017/', function(err, database) {
        if(err) {
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
