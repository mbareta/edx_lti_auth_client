const deliverableContentTree = {
  businessplan: {
    title: 'Business Plan',
    activitiesCount: 30,
    subDeliverables: {
      executivesummary: {
        title: 'Executive Summary',
        description: 'An executive summary is often considered the most important part of a business plan. This is a summary of the key points you want your audience to tune into. You’ll want to fill this out last after you’ve had a chance to go through each section. Depending on which audience you are presenting your plan to, you’ll want to tailor this section to be most relevant to them...',
        activities: {
          venturedescription: {
            title: 'Venture Description',
            description: 'What business is your venture in, and what is the current stage of development? Current stage of development may be start-up, initial operations, expansion, rapid growth, or stable operations. Briefly describe your business model. What is unique about the product/service, and what proprietary rights does the business have?'
          },
          managementandorganizationplan: {
            title: 'Management and Organization Plan',
            description: 'What form of organization does the business operate under, and why? Who are the key management team members and what skills do they have to help the business? Who are the key support groups for your management team, including accountants, attorneys, consultants, board of directors, and advisory board members?'
          },
          marketingplan: {
            title: 'Marketing Plan',
            description: 'What is the market like in terms of the industry, the customer, customer needs, product benefits, the venture’s target markets, and the market penetration plan? Who are the major competitors, and what are their strengths and weaknesses? What are your market penetration plans? Include specific facts and figures from your market research.'
          },
          financialplan: {
            title: 'Financial Plan',
            description: 'What will it cost to start this business? What are the projections for sales and net profit? How much cash will be needed to start and operate this business? What sources of financing have been, and will be, sought? How much money has been contributed by the entrepreneur? What is your exit strategy?'
          }
        }
      }
    }
  }
};

const getDeliverable = key => deliverableContentTree[key];

const getSubDeliverable = key => Object.values(deliverableContentTree)
  .reduce((flattened, { subDeliverables }) => subDeliverables, {})[key];

const getActivity = key =>
  Object.values(deliverableContentTree)
    .reduce((flattened, { subDeliverables }) => Object.values(subDeliverables), [])
    .reduce((flattened, subDeliverableContent) => subDeliverableContent.activities, {})[key];

module.exports = {
  getDeliverable,
  getSubDeliverable,
  getActivity,
  deliverableContentTree
};
