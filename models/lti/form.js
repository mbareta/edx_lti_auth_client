'use strict';

const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ObjectId = require('mongodb').ObjectID;

const mongoDbName = 'form_responses';

class Form {
  saveResponse({ email, type, data, metadata, lti }) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .insertOne({
        email,
        type,
        data,
        metadata,
        lti
      });
  }

  getResponseById(id) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ _id: ObjectId(id) });
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

  updateResponse({ _id, email, type, data, metadata, lti }) {
    return mongoConnectionPool.db.collection(mongoDbName)
      .update({ _id }, { $set: { email, type, data, metadata, lti } });
  }

  // exists(...queryParameters) {
  //   return mongoConnectionPool.db.collection(mongoDbName)
  //     .findOne({ email: 'staff@example.com' })
  //     .then(queryResult => queryResult ? true : false);
  // }

  // upsert(id, email, type, data, metadata) {
  //   return this.exists(email)
  //   .then(result => {
  //     if (result) {
  //       return this.updateResponse(id, data, metadata);
  //     }
  //     else {
  //       return this.saveResponse(email, type, data, metadata);
  //     }
  //   });
  // }
}

module.exports = new Form();
