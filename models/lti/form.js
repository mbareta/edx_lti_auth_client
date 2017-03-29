'use strict';

const Promise = require('bluebird');
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

  anyWithLti(lti) {
    if (!lti) {
      return Promise.resolve(false);
    }

    const { outcomeServiceSourcedId } = lti;
    return mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ 'lti.outcomeServiceSourcedId': outcomeServiceSourcedId })
      .then(queryResult => !!queryResult);
  }

  upsert(formResponse) {
    return this.anyWithLti(formResponse.lti)
    .then(exists => {
      if (exists) {
        return this.updateResponse(formResponse);
      }
      return this.saveResponse(formResponse);
    });
  }
}

module.exports = new Form();
