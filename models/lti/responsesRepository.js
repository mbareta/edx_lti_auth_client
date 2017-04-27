'use strict';

const Promise = require('bluebird');
const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ObjectId = require('mongodb').ObjectID;

const mongoDbName = 'lti_responses';

const responsesRepository = () => {
  const updateResponse = ({ _id, email, type, data, metadata, lti }) =>
    mongoConnectionPool.db.collection(mongoDbName)
      .update(
        { _id },
        { $set: { email, type, data, metadata, lti } }
      );

  const saveResponse = ({ email, type, data, metadata, lti }) =>
    mongoConnectionPool.db.collection(mongoDbName)
      .insertOne({
        email,
        type,
        data,
        metadata,
        lti
      });

  const anyWithLti = (lti) => {
    if (!lti) {
      return Promise.resolve(false);
    }

    const { outcomeServiceSourcedId } = lti;
    return mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ 'lti.outcomeServiceSourcedId': outcomeServiceSourcedId })
      .then(queryResult => !!queryResult);
  };

  const getResponseById = (id) => mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ _id: ObjectId(id) });

  const getResponsesByEmail = (email) => mongoConnectionPool.db.collection(mongoDbName)
      .find({ email })
      .toArray();

  const getDeliverableTypesByEmail = (email) => mongoConnectionPool.db.collection(mongoDbName)
      .distinct('type', { email });

  const getDeliverableByType = (email, type = 'subDeliverable') => mongoConnectionPool.db.collection(mongoDbName)
      .find({ $and: [{ email, type }] })
      .toArray();

  const upsert = (formResponse) => anyWithLti(formResponse.lti)
    .then(exists => {
      if (exists) {
        return updateResponse(formResponse);
      }
      return saveResponse(formResponse);
    });

  return {
    updateResponse,
    saveResponse,
    anyWithLti,
    getResponseById,
    getResponsesByEmail,
    getDeliverableTypesByEmail,
    getDeliverableByType,
    upsert
  };
};

module.exports = responsesRepository();
