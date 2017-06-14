'use strict';

const Promise = require('bluebird');
const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ObjectId = require('mongodb').ObjectID;

const mongoDbName = 'lti_responses';

const responsesRepository = () => {
  const updateResponse = ({ _id, email, type, subType, data, metadata, lti }) =>
    mongoConnectionPool.db.collection(mongoDbName)
      .update(
        { _id },
        { $set: { email, type, subType, data, metadata, lti } }
      );

  const saveResponse = ({ name, email, type, subType, data, metadata, lti }) =>
    mongoConnectionPool.db.collection(mongoDbName)
      .insertOne({
        name,
        email,
        type,
        subType,
        data,
        metadata,
        lti
      });

  const getResponseById = (id) => mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ _id: ObjectId(id) });

  const getResponsesByEmail = email => mongoConnectionPool.db.collection(mongoDbName)
      .find({ email })
      .toArray();

  const getResponseByEmail = (name, email) => mongoConnectionPool.db.collection(mongoDbName)
      .findOne({ name, email });

  const getDeliverableTypesByEmail = email => mongoConnectionPool.db.collection(mongoDbName)
      .distinct('type', { email });

  const getDeliverableByType = (email, type) => mongoConnectionPool.db.collection(mongoDbName)
      .find({ $and: [{ email, type }] })
      .toArray();

  const upsert = formResponse => getResponseByEmail(formResponse.name, formResponse.email)
    .then(existingResponse => {
      if (existingResponse) {
        formResponse._id = existingResponse._id;
        return updateResponse(formResponse);
      }
      return saveResponse(formResponse);
    });

  return {
    updateResponse,
    saveResponse,
    getResponseById,
    getResponsesByEmail,
    getResponseByEmail,
    getDeliverableTypesByEmail,
    getDeliverableByType,
    upsert
  };
};

module.exports = responsesRepository();
