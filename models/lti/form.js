'use strict';

const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ObjectId = require('mongodb').ObjectID;

const mongoDbName = 'form_responses';

class Form {
  saveResponse(email, type, data, metadata) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .insertOne({
        email,
        type,
        data,
        metadata
      });
  }
  getResponsesByEmail(email) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .find({ email })
      .toArray();
  }
  getDeliverableByType(email, type = 'subDeliverable') {
    return mongoConnectionPool.db.collection(mongoDbName)
      .find({ $and: [{ email, type }] })
      .toArray();
  }
  updateResponse(id, data, metadata) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .update({ _id: ObjectId(id) }, { $set: { data, metadata } });
  }
}

module.exports = new Form();
