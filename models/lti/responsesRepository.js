const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ObjectId = require('mongodb').ObjectID;

const mongoDbName = 'lti_responses';

const responsesRepository = () => {
  const updateResponse = ({ _id, email, type, subType, data, metadata, lti }) =>
    mongoConnectionPool.db
      .collection(mongoDbName)
      .update({ _id }, { $set: { email, type, subType, data, metadata, lti } });

  const updateResponsesEmail = (email, newEmail) =>
    mongoConnectionPool.db
      .collection(mongoDbName)
      .update({ email }, { $set: { email: newEmail } }, { multi: true });

  // replace with single params object
  const saveResponse = ({ name, email, type, subType, data, metadata, lti }) =>
    mongoConnectionPool.db.collection(mongoDbName).insertOne({
      name,
      email,
      type,
      subType,
      data,
      metadata,
      lti,
    });

  const getResponseById = id =>
    mongoConnectionPool.db.collection(mongoDbName).findOne({ _id: ObjectId(id) });

  const existsByEmail = email =>
    mongoConnectionPool.db.collection(mongoDbName).findOne({ email });

  const getResponsesByEmail = email =>
    mongoConnectionPool.db
      .collection(mongoDbName)
      .find({ email })
      .toArray();

  const getResponseByEmail = (name, email) =>
    mongoConnectionPool.db.collection(mongoDbName).findOne({ name, email });

  const getDeliverableTypesByEmail = email =>
    mongoConnectionPool.db.collection(mongoDbName).distinct('type', { email });

  const getDeliverableByType = (email, type) =>
    mongoConnectionPool.db
      .collection(mongoDbName)
      .find({ $and: [{ email, type }] })
      .toArray();

  const upsert = formResponse =>
    getResponseByEmail(formResponse.name, formResponse.email).then(existingResponse => {
      if (existingResponse) {
        formResponse._id = existingResponse._id; // eslint-disable-line no-underscore-dangle
        return updateResponse(formResponse);
      }
      return saveResponse(formResponse);
    });

  return {
    updateResponse,
    saveResponse,
    getResponseById,
    existsByEmail,
    getResponsesByEmail,
    getResponseByEmail,
    getDeliverableTypesByEmail,
    getDeliverableByType,
    updateResponsesEmail,
    upsert,
  };
};

module.exports = responsesRepository();
