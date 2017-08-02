const deliverableContentTree = require('./content');

const getDeliverable = key => deliverableContentTree[key];

/**
 * Traverses over a tree collecting all sub deliverables
 * into key-value pairs object. R
 * Returns subdeliverable node by key with all of child nodes (title, description, activities)
 */
const getSubDeliverable = key =>
  Object.values(deliverableContentTree).reduce(
    (flattened, { subDeliverables }) =>
      Object.assign(flattened, subDeliverables),
    {}
  )[key];

/**
 * Traverses over a tree collecting all activities into key-value pairs object.
 * Returns activity node by key with all of child nodes (title, description)
 */
const getActivity = key =>
  Object.values(deliverableContentTree)
    .reduce(
      (flattened, { subDeliverables }) => [
        ...flattened,
        ...Object.values(subDeliverables)
      ],
      []
    )
    .reduce(
      (flattened, { activities }) => Object.assign(flattened, activities),
      {}
    )[key];

/**
 * Traverses over a tree collecting keys of deliverable and sub deliverable
 * that have activity given by key
 * i.e. { deliverable: 'businessplan', subDeliverable: 'executivesummary' }
 */
const getPathToActivity = key => {
  let deliverableNode;
  let subDeliverableNode;

  Object.keys(deliverableContentTree).forEach(deliverable => {
    const subDeliverables = deliverableContentTree[deliverable].subDeliverables;

    Object.keys(subDeliverables).forEach(subDeliverable => {
      const activities = subDeliverables[subDeliverable].activities;

      Object.keys(activities).forEach(activity => {
        if (activity === key) {
          deliverableNode = deliverable;
          subDeliverableNode = subDeliverable;
        }
      });
    });
  });

  return {
    deliverable: deliverableNode,
    subDeliverable: subDeliverableNode
  };
};

/**
 * Returnes structured html content as string, with titles of deliverables
 * sub deliverables and activites, with activity data for the user requesting it
 * @param {*} key - name of the deliverable
 * @param {*} data - all of the user activities data
 */
const getDeliverableContent = (key, data) => {
  const deliverable = getDeliverable(key);
  let content = `<h1>${deliverable.title}</h1><br>`;

  if (Object.keys(deliverable.subDeliverables).length > 1) {
    Object.keys(deliverable.subDeliverables).forEach(subDeliverable => {
      const subDeliverableContent = getSubDeliverable(subDeliverable);
      content = `${content} <br><h2>${subDeliverableContent.title}</h2><br>`;

      const activities = subDeliverableContent.activities;

      content = `${content} ${getActivitiesContentWithData(activities, data)}`;
    });
  } else {
    Object.keys(deliverable.subDeliverables).forEach(subDeliverable => {
      const activities = getSubDeliverable(subDeliverable).activities;

      content = `${content} ${getActivitiesContentWithData(activities, data)}`;
    });
  }

  return content;
};

/**
 * Helper function used by getDeliverableContent to activities part of the html content
 * @param {*} activities - key-value pairs, where key is activity
 *  and value is object with all child nodes (title, description)
 * @param {*} data - all of the user activities data
 */
const getActivitiesContentWithData = (activities, data) =>
  Object.keys(activities).reduce((content, activity) => {
    const activityContent = getActivity(activity);
    const activityData = data.find(a => a.name === activity);

    return `${content}<br><h3>${activityContent.title}</h3><br> ${activityData ? activityData.data : ''}`;
  }, '');

module.exports = {
  getDeliverable,
  getSubDeliverable,
  getActivity,
  getPathToActivity,
  deliverableContentTree,
  getDeliverableContent
};
