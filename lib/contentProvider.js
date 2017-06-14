const deliverableContentTree = {
  businessplan: {
    title: 'Business Plan',
    description: 'Business Plan Description',
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
      },

      managementandorganizationplan: {
        title: 'Management and Organization Plan',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ultricies nisi in semper. Nam sollicitudin facilisis augue et semper. Phasellus congue sem odio, varius ultrices nisl fermentum vel. Integer porttitor, tortor at aliquet efficitur, nisl tellus blandit nunc, quis malesuada leo metus in ex. Sed lobortis auctor libero sed gravida. Pellentesque iaculis nisi orci, eu volutpat purus vulputate in. Morbi suscipit magna at velit blandit ultrices. Aenean viverra lectus eget aliquam euismod. Nullam vel pharetra libero, quis condimentum dolor. In egestas magna sed magna tempor, quis rutrum tellus ornare.',
        activities: {
          legalformofbusiness: {
            title: 'Legal Form of Business',
            description: 'What legal form has been selected? What are the major reasons for this selection? What is the state of incorporation (corporations) or organization (LLCs)? In which states will it be necessary to be authorized to do business? Some legal forms allow for special elections for tax purposes. What, if any, tax treatment elections will you request?'
          },
          managementteam: {
            title: 'Management Team',
            description: 'What is the contribution of the entrepreneur? Who are the key management team members, and what are their job descriptions and prior experiences? What offices or titles, such as president or chief financial officer, will each hold? What experience and qualifications are desired for future management positions? When and how will these be filled?'
          },
          advisoryboard: {
            title: 'Board of Directors/Advisory Board',
            description: 'Who are the board of directors or advisory board members? Include names, compensation, and any ownership in the company. What are their qualifications related to the business?'
          },
          recruitment: {
            title: 'Recruitment and Selection of Employees',
            description: 'What is your plan to find and hire self-motivated people for your business? What are the required qualifications, the duties to be performed, and the interview and hiring guidelines to be followed?'
          },
          compensationandownership: {
            title: 'Compensation and Ownership',
            description: 'What is the compensation package for the entrepreneur and other key management team members? What are their salaries, benefits, and bonuses? What portion of the business is owned by the entrepreneur and management team?'
          },
          incentiveplan: {
            title: 'Employee Reward and Incentive Plan',
            description: 'What system for employee rewards and incentives will be in effect? What is the incentive plan? Include special recognition awards, lump sum awards, bonuses, stock options, profit sharing, deferred compensation, commissions, teamwork, and flexible hours.'
          },
          communication: {
            title: 'Communication',
            description: 'How will you communicate your business values and expectations? What system will you use to assure clarity of communication throughout your business?'
          },
          infrastructure: {
            title: 'Infrastructure',
            description: 'Who are the key advisers? Include names and compensation of accountants, lawyers, bankers, and consultants. What expertise will they provide? Include strategic alliances, computer technology, management, marketing, and specialists in product or service issues.'
          },
          operationsplan: {
            title: 'Operations Plan',
            description: 'What are the operational systems that are needed for your business to function smoothly?'
          },
        }
      },
      productplan: {
        title: 'Product / Service Plan',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ultricies nisi in semper. Nam sollicitudin facilisis augue et semper. Phasellus congue sem odio, varius ultrices nisl fermentum vel. Integer porttitor, tortor at aliquet efficitur, nisl tellus blandit nunc, quis malesuada leo metus in ex.',
        activities: {
          purposeofproduct: {
            title: 'Purpose of Product/Service',
            description: 'What is the purpose of the product/service? How does the product/service benefit the customer? Does it solve a problem or address an opportunity? Is it a luxury item or a needed good?'
          },
          features: {
            title: 'Features and Benefits',
            description: 'What are the unique features of the product/service, such as cost, design, quality, and capabilities? What benefits does the customer receive? What problem is solved for the customer?'
          },
          stageofdevelopment: {
            title: 'Stage of Development [Optional]',
            description: 'What is the history of product/service development? At what stage of development is the product/service (model stage, working prototype, small production runs, full manufacturing/ production, or other)? When do you plan to achieve other stages of development? At what life cycle stage is the product/service (conception, introduction, growth, maturity, innovation, or decline)?'
          },
          productlimitations: {
            title: 'Product / Service Limitations',
            description: 'What are the inherent product/service limitations, if any? Include perishability, limited shelf life, installation needs, legal restrictions, staff availability, or other relevant limitations.'
          },
          intellectualproperty: {
            title: 'Intellectual Property',
            description: 'How will you protect intellectual property? What patents, trademarks, or copyrights have been obtained or which ones will be pursued? What license or royalty agreements are associated with the product/service, and what plans have been made for future agreements? What distribution rights have been obtained or given away?'
          },
          governmentapprovals: {
            title: 'Government Approvals',
            description: 'What governmental agencies regulate businesses in your industry? What governmental approvals are necessary, and what is the status of such approvals? Some examples of agencies providing governmental approvals include the FDA, EPA, FCC, USDA, OSHA, IRS, secretary of state, State Department of Revenue and Taxation, Workers’ Compensation Division, health departments, planning and zoning commissions.'
          }
        }
      },
      marketingplan: {
        title: 'Marketing Plan',
        description: `Your industry profile gives an at-a-glance look at the industry you are in as a whole. When creating your profile, make sure to cover the following:
  | Current size - What is the current size of your industry? How much is spent annually?
  | Growth potential - How much is the industry growing, stabilizing or declining?
  | Industry trends - What are the trends in the industry?
  | Optionally/if relevant to you, cover:
  | Other characteristics - What other key facts and figures are important to your industry. For example, what seasonal issues affect your industry?
  | Distribution Channels: How is your product or service currently distributed?`,
        activities: {
          industryprofile: {
            title: 'Industry Profile',
            description: 'What legal form has been selected? What are the major reasons for this selection? What is the state of incorporation (corporations) or organization (LLCs)? In which states will it be necessary to be authorized to do business? Some legal forms allow for special elections for tax purposes. What, if any, tax treatment elections will you request?'
          },
          competitiveanalysis: {
            title: 'Competitive Analysis',
            description: 'This part of your marketing plan should highlight that you understand and have researched who your competitors are. Make sure to address your: Direct Competition - What direct competition exists for your product/service? What companies sell similar products/services to the same target market? Indirect Competition - What indirect competition exists for your product/service? What companies sell different products/services that fill the same need as your product/service? Future Competition - What future competition do you expect to have for your product/service? Competitive Analysis - What is your competitive advantage? Include a competitive analysis chart and summarize key points. How will your product/service compete in the areas of price, quality, unique features, distribution system, marketing/advertising, geographic location, and strengths/weaknesses?'
          },
          marketanalysis: {
            title: 'Market Analysis',
            description: '(Not yet written) (e.g.) Your target market profile, customer profile and future markets...'
          },
          pricing: {
            title: 'Pricing',
            description: 'What is your plan to find and hire self-motivated people for your business? What are the required qualifications, the duties to be performed, and the interview and hiring guidelines to be followed?'
          },
          marketpenetration: {
            title: 'Market Penetration',
            description: '(Not yet written) (e.g.) Your company image, customer service, location and sales tactics...'
          }
        }
      },
      financialplan: {
        title: 'Financial Plan',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ultricies nisi in semper. Nam sollicitudin facilisis augue et semper. Phasellus congue sem odio, varius ultrices nisl fermentum vel. Integer porttitor, tortor at aliquet efficitur, nisl tellus blandit nunc, quis malesuada leo metus in ex.',
        activities: {
          startupcosts: {
            title: 'Startup Costs',
            description: 'What are your estimated costs to start this business? Are these one-time costs (expenditures) or ongoing costs (expenses)?'
          },
          salesprojections: {
            title: 'Sales Projections',
            description: 'What are your sales projections for the next three years? Where did you get the information to project financials? Are the projections reasonable?'
          },
          incomeprojections: {
            title: 'Income Projections',
            description: 'What are your net income projections for the next three years? When will your company be profitable?'
          },
          cashrequirements: {
            title: 'Cash Requirements',
            description: 'How much cash will be required to cover startup costs, operations, and/or growth?'
          },
          sourcesoffinancing: {
            title: 'Sources of Financing',
            description: 'Based on cash requirements to start, maintain operations, and grow, will you seek debt or equity financing? How much is the cost of obtaining these funds?'
          },
          exitstrategy: {
            title: 'Exit Strategy',
            description: 'What is your overall plan for growth? How will this plan enable you to obtain a wealthy harvest upon exit? What are your specific plans for going public, selling the business, merging the business, or other?'
          }
        }
      }
    }
  },
  businessmodelcanvas: {
    title: 'Business Model Canvas',
    description: `The Business Model Canvas is a template that helps start with the beginning elements of any business. Like an artist’s color wheel, the Business Model Canvas does not prevent the entrepreneur from coming up with unique combinations.

    The Business Model Canvas template was developed by a team of researchers from Switzerland and including input from over 400 professionals who study or create startups.

    Make multiple versions to capture different business models... To make a new version, simply update one of the components, save and then click print. Keep the printed versions so that you can compare between the various Business Models you developed.`,
    activitiesCount: 9,
    subDeliverables: {
      businessmodelcanvasdefault: {
        activities: {
          valueproposition: {
            title: 'Value Proposition',
            description: 'What makes your service or product valuable to a customer? Like an elevator pitch, the value proposition should be clear and succinct.'
          },
          customersegments: {
            title: 'Customer Segments',
            description: 'Who will benefit from your value proposition? Your answer may include a variety of potential segments. To maintain focus, include up to three customer segments which you feel your product/service most strongly would benefit.'
          },
          customerrelationships: {
            title: 'Customer Relationships',
            description: 'What type of experience links your value proposition and target customers? Your response could be simply selecting one of the relationship types defined in the or you could include other relationships the way the example describes Customer Promoters.'
          },
          distributionchannels: {
            title: 'Distribution Channels',
            description: 'How do you deliver your value proposition to target customers? Double check your distribution channels will serve each of the customer segments you identified previously.'
          },
          revenuestreams: {
            title: 'Revenue Streams',
            description: 'What size and frequency cash flows will the company generate? Having only one revenue stream is a sufficient and there doesn’t need to multiple streams. But, if you only have one revenue stream it may be an indicator to think about other revenue opportunities.'
          },
          differentiators: {
            title: 'Differentiators',
            description: 'What are the key activities which make your company different and create a competitive advantage? You don’t need to identify all the activities your business may perform just the activities which are unique or special.'
          },
          assets: {
            title: 'Assets',
            description: 'What resources do you have which can generate value? Not every asset category should be represented, just those which you expect to generate revenue, value or has the potential to create value.'
          },
          keypartners: {
            title: 'Key Partners',
            description: 'Which partner relationships are critical to your company’s success? Your business will have a lot of stakeholders, but just include your key business partners, mentors, or financial partners which are special to your business here.'
          },
          coststructure: {
            title: 'Cost Structure',
            description: 'What costs are needed upfront to start the business and how will costs change overtime? Every new business will incur some startup costs and assume future operational costs. Try to identify those costs which are central to starting and growing the business.'
          }
        }
      }
    }
  },
  pitchdeck: {
    title: 'Pitch Deck',
    description: `Throughout the life of your business you’re going to be pitching it. This can come in many forms. You may be just in a business idea phase and pitching your thoughts to a friend over coffee, or you may be well established and growing and pitching your business to investors and internal stakeholders.

    The way that you describe your business—everything from the problem it solves to it future milestones—will change over time as your business grows. It will also change depending on who you are talking to—if you’re talking to an investor you’ll pitch who you are and what you do in one way. If you’re talking to a client, you’ll tailor your talking points to meet their needs.

    The important thing is to think through the way you want to pitch your key talking points to others. And to practice your messaging and delivery—make sure your message is really resonating with your audience.

    This Pitch tool is a space where you can reflect and collect your key pitch messages. As you go throughout the course, you’ll be pointed to different activities that are part of the pitch tool. Use this tool to help you refine your thinking as you go along, and also come back to update it as your thinking changes.

    Because things will change. The problem you solve may change, the way you describe it may change. But if you are able to articulate your current thoughts that will give you the best jumping off point to refine your ideas, research your ideas, and learn about your business from talking about it to others — no matter what stage you are in. *Add point about how you describe business to others when getting feedback/market research`,
    activitiesCount: 5,
    subDeliverables: {
      pitchdeckdefault: {
        activities: {
          businessname: {
            title: 'Business Name',
            description: ''
          },
          businessstatement: {
            title: 'Business Statement',
            description: ''
          },
          tweetablebusiness: {
            title: 'Tweetable Business',
            description: ''
          },
          elevatorpitch: {
            title: 'Elevator Pitch',
            description: ''
          },
          mystory: {
            title: 'My Story',
            description: ''
          }
        }
      }
    }
  },
  financialforecast: {
    title: 'Financial Forecast',
    description: 'Downloadable document',
    activitiesCount: 0,
    subDeliverables: {}
  }
};

const getDeliverable = key => deliverableContentTree[key];

const getSubDeliverable = key => Object.values(deliverableContentTree)
  .reduce((flattened, { subDeliverables }) => Object.assign(flattened, subDeliverables), {})[key];

const getActivity = key =>
  Object.values(deliverableContentTree)
    .reduce((flattened, { subDeliverables }) => [...flattened, ...Object.values(subDeliverables)],
    [])
    .reduce((flattened, { activities }) => Object.assign(flattened, activities), {})[key];

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

module.exports = {
  getDeliverable,
  getSubDeliverable,
  getActivity,
  getPathToActivity,
  deliverableContentTree
};
