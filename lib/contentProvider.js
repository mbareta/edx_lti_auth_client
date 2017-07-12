const deliverableContentTree = {
  businessplan: {
    title: 'Business Plan',
    icon: 'fa fa-pie-chart',
    shortDescription: 'Plan out the key elements of your business from marketing to pricing and everything in between.',
    description: `
    Developing a business plan is a function of thinking, researching, evaluating and planning. This Business Plan tool can help you through this process.

    If you are in the early stages of business development, use the tool as a way to guide your thinking. You won’t have all the answers right away, but you can use the tool to take notes and to get a feel for how you might focus your research.

    If you’re in a later stage of business development, you can use the tool as a jumping off point for crafting a written plan that you can deliver to investors and other stakeholders.

    When you are in the design and planning stages of your business, don’t get hung up on refining every sentence of your plan. The writing will be easier once the planning process is complete.

    <div class="tool-features">
      <p>Tool features to note:</p>

      <p><b>View in course.</b> If you get stuck or need help while writing, you can find relevant course content by clicking the “View in course” link to the left of the Save button.</p>

      <p><b>Saving.</b> You can edit directly here or in the course itself. Any changes you make will be saved in both places.</p>

      <p><b>Downloading.</b> To download go to the “Preview Mode” link in the top right corner of the Workspace. This will be especially useful to you if you want to save a copy to use outside of the course or further refine your work using your own word processing software.</p>
    </div>
    <br>
    <div class="tip">
      <div class="tip-content">
        <div class="highlight">
          Tip:
        </div>
        When you have completed the activities in the Business Plan tool, tips for customizing and refining your plan can be found in Section 4 - <a href="#">Putting Together a Business Plan</a>
      </div>
    </div>
    `,
    activitiesCount: 30,
    subDeliverables: {
      executivesummary: {
        title: 'Executive Summary',
        description: `
        The executive summary is generally considered the most important part of a business plan. A summary of the key points you want your audience to tune into, it describes your business, its market and customers, your company goals, and how you will meet them.

        Depending on which audience you are presenting your plan to, you can tailor this section to showcase what you want them to know.
        `,
        activities: {
          venturedescription: {
            title: 'Venture Description',
            description: `
            <ul class="activity-description-list">
              <li>What business is your venture in, and what is the current stage of development? Current stage of development may be startup, initial operation, expansion, rapid growth, or stable operation.</li>
              <li>Briefly describe your business model. What is unique about the product/service, and what proprietary rights does the business have?</li>
            </ul>
            `
          },
          managementandorganizationplan: {
            title: 'Management and Organization Plan',
            description: `
            <ul class="activity-description-list">
              <li>What form of organization does the business operate under, and why?</li>
              <li>Who are the key management team members, and what skills do they have to help the business?</li>
              <li>Who are the key support groups for your management team, including accountants, attorneys, consultants, board of directors, and advisory board members?</li>
            </ul>
            `
          },
          marketingplan: {
            title: 'Marketing Plan',
            description: `
            <ul class="activity-description-list">
              <li>What is the market like in terms of the industry, the customer, customer needs, product benefits, the venture’s target markets, and the market penetration plan?</li>
              <li>Who are the major competitors, and what are their strengths and weaknesses?</li>
              <li>What are your market penetration plans? Include specific facts and figures from your market research.</li>
            </ul>
            `
          },
          financialplan: {
            title: 'Financial Plan',
            description: `
            <ul class="activity-description-list">
              <li>What will it cost to start this business?</li>
              <li>What are the projections for sales and net profit?</li>
              <li>How much cash will be needed to start and operate this business?</li>
              <li>What sources of financing have been, and will be, sought?</li>
              <li>How much money has been contributed by the entrepreneur? What is your exit strategy?</li>
            </ul>
            `
          }
        }
      },

      managementandorganizationplan: {
        title: 'Management and Organization Plan',
        description: `
        In this part of the business plan, you’ll ensure that your business will have the management expertise needed to be a success. When starting a business, entrepreneurs wear many hats. At one moment you may be responsible for marketing and sales. The next moment you may need to order supplies, answer phones, or clean the showroom.
        <br><br>
        This rarely lasts for those companies that grow. The demands of a successful business force entrepreneurs to add employees or a management team to the operations of the business.
        <br><br>
        As you answer questions for the management and organization plan, highlight both the current and future management needs of the business. Current needs identify the responsibilities carried out by you and others as you start the business. Future needs identify the responsibilities that will require additional management team members.
        <br><br>
        If any members of your management team lack the necessary credentials or experience, explain how these deficiencies will be overcome with assistance from the board of directors, an advisory council, consultants, attorneys, accountants, and other resources.
        <br><br>
        <div class="subdeliverable tip">
          <div class="tip-content">
            <div class="highlight">
              Tip:
            </div>
            It’s best to show each management position, even if you are the one performing all these functions. This practice will give you a healthy perspective about the different roles that you will be required to fill and provide you with an understanding of the key team members that you must recruit in the future.
          </div>
        </div>
        `,
        activities: {
          legalformofbusiness: {
            title: 'Legal Form of Business',
            description: `
            <ul class="activity-description-list">
              <li>What legal form have you selected for your business? What are the major reasons for this selection?</li>
              <li>What is the state of incorporation (corporations) or organization (LLCs)?</li>
              <li>In which states will it be necessary to be authorized to do business?</li>
              <li>Some legal forms allow for special elections for tax purposes. What, if any, tax treatment elections will you request?</li>
            </ul>
            `
          },
          managementteam: {
            title: 'Management Team',
            description: `
            <ul class="activity-description-list">
              <li>What is the contribution of the entrepreneur?</li>
              <li>Who are the key management team members, and what are their job descriptions and prior experiences? What offices or titles, such as president or chief financial officer, will each hold?</li>
              <li>What experience and qualifications are desired for future management positions? When and how will these be filled?</li>
              <li>Does your management team as a whole lack the needed credentials or experience? Explain how these deficiencies will be overcome with assistance from a board of directors, an advisory board, contractors, consultants, attorneys, accountants, or other outside help.</li>
            </ul>
            `
          },
          advisoryboard: {
            title: 'Board of Directors/Advisory Board',
            description: `
            <ul class="activity-description-list">
              <li>Who are the board of directors or advisory board members? Include names, compensation, and any ownership in the company.</li>
              <li>What are their qualifications related to the business?</li>
            </ul>
`
          },
          recruitment: {
            title: 'Recruitment and Selection of Employees',
            description: `
            <ul class="activity-description-list">
              <li>What is your plan to find and hire self-motivated people for your business?</li>
              <li>What are the required qualifications, the duties to be performed, and the interview and hiring guidelines to be followed?</li>
            `
          },
          compensionandownership: {
            title: 'Compension and Ownership',
            description: `
            <ul class="activity-description-list">
              <li>What is the compensation package for the entrepreneur and other key management team members?</li>
              <li>What are their salaries, benefits, and bonuses?</li>
              <li>What portion of the business is owned by the entrepreneur and management team?</li>
            </ul>
            `
          },
          incentiveplan: {
            title: 'Employee Reward and Incentive Plan',
            description: `
            <ul class="activity-description-list">
              <li>What system for employee rewards and incentives will be in effect?</li>
              <li>What is the incentive plan? Include special recognition awards, lump sum awards, bonuses, stock options, profit sharing, deferred compensation, commissions, teamwork, and flexible hours.</li>
            </ul>
            `
          },
          communication: {
            title: 'Communication',
            description: `
            <ul class="activity-description-list">
              <li>How will you communicate your business values and expectations to your team? What system will you use to assure clarity of communication throughout your business?</li>
            </ul>
            `
          },
          infrastructure: {
            title: 'Infrastructure',
            description: `
            <ul class="activity-description-list">
              <li>Who are the key advisers? Include names and compensation of accountants, lawyers, bankers, and consultants.</li>
              <li>What expertise will they provide? Include strategic alliances, computer technology, management, marketing, and specialists in product or service issues.</li>
            </ul>
            `
          },
          operationsplan: {
            title: 'Operations Plan',
            description: `
            <ul class="activity-description-list">
             <li>What are the operational systems that are needed for your business to function smoothly?</li>
            </ul>
            `
          }
        }
      },
      productplan: {
        title: 'Product / Service Plan',
        description: `
        In this part of the business plan, you’ll describe your product/service and how it benefits customers. Each feature should be described in terms of the benefit the customer receives or as a solution to the customer’s needs.
        <br><br>
        Present your product/service in a favorable light, but be honest about its limitations and any potential liabilities. You may also provide information regarding production of the product/service, as well as any potential spin-offs or related developments.
        <br><br>
        Additionally, include your plan for protecting your intellectual property and getting any necessary government approvals.
        `,
        activities: {
          purposeofproduct: {
            title: 'Purpose of Product/Service',
            description: `
            <ul class="activity-description-list">
              <li>What is the purpose of the product/service?</li>
              <li>How does the product/service benefit the customer?</li>
              <li>Does it solve a problem or address an opportunity?</li>
              <li>Is it a luxury item or a needed good?</li>
            </ul>
          `
          },
          features: {
            title: 'Features and Benefits',
            description: `
            <ul class="activity-description-list">
              <li>What are the unique features of the product/service, such as cost, design, quality, and capabilities?</li>
              <li>What benefits does the customer receive?</li>
              <li>What problem is solved for the customer?</li>
            </ul>
            `
          },
          stageofdevelopment: {
            title: 'Stage of Development [Optional]',
            description: `
            <ul class="activity-description-list">
              <li>What is the history of product/service development?</li>
              <li>At what stage of development is the product/service (model stage, working prototype, small production runs, full manufacturing/ production, or other)?</li>
              <li>When do you plan to achieve other stages of development?</li>
              <li>At what life cycle stage is the product/service (conception, introduction, growth, maturity, innovation, or decline)?</li>
            </ul>
            `
          },
          productlimitations: {
            title: 'Product / Service Limitations',
            description: '<ul class="activity-description-list"><li>What are the inherent product/service limitations, if any? Include perishability, limited shelf life, installation needs, legal restrictions, staff availability, or other relevant limitations.</li></ul>'
          },
          intellectualproperty: {
            title: 'Intellectual Property',
            description: `
            <ul class="activity-description-list">
              <li>How will you protect intellectual property?</li>
              <li>What patents, trademarks, or copyrights have been obtained, or which ones will be pursued?</li>
              <li>What license or royalty agreements are associated with the product/service, and what plans have been made for future agreements?</li>
              <li>What distribution rights have been obtained or given away?</li>
            </ul>
            `
          },
          governmentapprovals: {
            title: 'Government Approvals',
            description: `
            <ul class="activity-description-list">
              <li>What governmental agencies regulate businesses in your industry?</li>
              <li>What governmental approvals are necessary, and what is the status of such approvals?</li>
            </ul>
            `
          }
        }
      },
      marketingplan: {
        title: 'Marketing Plan',
        description: `
        The marketing plan is critical to the business plan. Why? Because, in some cases, the marketing strategies and the marketing skills of the management team determine the success of the business.
        <br><br>
        Your marketing plan should provide a snapshot into your industry, competitors, and market. It should tell the story of how your product fits into a larger landscape and how you intend to reach your target customers.
        `,
        activities: {
          industryprofile: {
            title: 'Industry Profile',
            description: `
            Provide an at-a-glance look at the industry you are in as a whole. Make sure to cover the following:
            <br>
            <ul class="activity-description-list" style="list-style-type: none;">
              <li>
                <b>Current size.</b>
                <ul style="padding-left: 3%; margin-bottom: 16px; list-style-type: disc;">
                  <li>What is the current size of your industry?</li>
                  <li>How much is spent annually?</li>
                </ul>
              </li>

              <li>
                <b>Growth potential.</b>
                <ul style="padding-left: 3%; margin-bottom: 16px; list-style-type: disc;">
                  <li>How much is the industry growing, stabilizing, or declining?</li>
                </ul>
              </li>

              <li>
                <b>Industry trends.</b>
                <ul style="padding-left: 3%; margin-bottom: 16px; list-style-type: disc;">
                  <li>What are the trends in the industry?</li>
                </ul>
              </li>
            </ul>
              <span class="hide-in-preview">Optionally/if relevant to you, cover:<span>
              <br><br>
              <b class="hide-in-preview">Other characteristics.</b>
              <ul class="activity-description-list" style="padding-left: 3%; margin-bottom: 16px; list-style-type: disc;">
                <li>What other key facts and figures are important to your industry?</li>
                <li>For example, what seasonal issues affect your industry?</li>
              </ul>
              <b>Distribution Channels.</b>
              <ul class="activity-description-list" style="padding-left: 3%; margin-bottom: 16px; list-style-type: disc;">
                <li>How is your product/service currently distributed?</li>
              </ul>
            `
          },
          competitiveanalysis: {
            title: 'Competitive Analysis',
            description: `
            Show that you understand and have researched who your competitors are. Make sure to address your:
            <br>
            <ul></ul>
            <b class="hide-in-preview">Direct competition.</b>
            <ul class="activity-description-list">
              <li>What direct competition exists for your product/service?</li>
              <li>What companies sell similar products/services to the same target market?</li>
            </ul>

            <b class="hide-in-preview">Indirect competition.</b>
            <ul class="activity-description-list">
              <li>What indirect competition exists for your product/service?</li>
              <li>What companies sell different products/services that fill the same need as your product/service?</li>
            </ul>

            <b class="hide-in-preview">Future competition.</b>
            <ul class="activity-description-list">
              <li>What future competition do you expect to have for your product/service?</li>
            </ul>

            <b class="hide-in-preview">Competitive analysis.</b>
            <ul class="activity-description-list">
              <li>What is your competitive advantage?</li>
              <li>How will your product/service compete in the areas of price, quality, unique features, distribution system, marketing/advertising, geographic location, and strengths/weaknesses?</li>
            </ul>
            `
          },
          marketanalysis: {
            title: 'Market Analysis',
            description: `
            Show that you understand your market. Make sure to include your:
            <br>
            <ul></ul>
            <b class="hide-in-preview">Target market.</b>
            <ul class="activity-description-list">
              <li>Who is your ideal customer/client?</li>
              <li>What are their relevant demographics, psychographics, and buying behaviors?</li>
              <li>What are their motivations for buying your product/service?</li>
              <li>What’s the size of your target market?</li>
            </ul>

            <b class="hide-in-preview">Future markets.</b>
            <ul class="activity-description-list">
              <li>What future markets could you go after?</li>
              <li>What would be their motivation for buying your product/service?</li>
              <li>What’s the size of these markets?</li>
            </ul>
            `
          },
          pricing: {
            title: 'Pricing',
            description: `
            Include the following:
            <br>
            <ul></ul>
	          <b class="hide-in-preview">Pricing strategy.</b>
            <ul class="activity-description-list">
              <li>What are your short- and long-term pricing strategies?</li>
              <li>What pricing constraints and sensitivities exist for your product/service?</li>
            </ul>

            <b class="hide-in-preview">Pricing policy.</b>
            <ul class="activity-description-list">
              <li>What are your pricing policies, including volume pricing, avoiding price conflicts, and bundling?</li>
            </ul>

            <b class="hide-in-preview">Price list.</b>
            <ul class="activity-description-list">
              <li>What is your price list, including purchase price, quantity discounts, introductory offers, shipping costs, and warranties or maintenance contracts?</li>
            </ul>
            `
          },
          marketpenetration: {
            title: 'Market Penetration',
            description: `
            Include the following (if relevant to you):
            <br>
            <ul></ul>
            <b class="hide-in-preview">Licensing and distribution.</b>
            <ul class="activity-description-list">
              <li>How will you distribute your product/service?</li>
              <li>To whom, if anyone, will you license your product/service?</li>
              <li>What upfront, annual, and royalty fees will you charge?</li>
              <li>What companies will be used to distribute your products/services? List the name and address of the distribution company, contact person, geographical area assigned, and a brief description of the distribution contract (if relevant).</li>
            </ul>

            <b class="hide-in-preview">Sales.</b>
            <ul class="activity-description-list">
              <li>Will an internal or external sales force be used for selling the product/service to the end user?</li>
              <li>How many sales persons will be hired?</li>
              <li>What will be the cost of using sales representatives (compensation package, allowances, catalogs, brochures, and samples)?</li>
            </ul>
            `
          }
        }
      },
      financialplan: {
        title: 'Financial Plan',
        description: `
        As inspiring as your vision is, as innovative as your product/service might be, every investor, every potential partner, needs to see that you understand your company's financials and how they relate to your business.

        In this section of your business plan, you’ll describe your startup costs, sales and income projections, your cash requirements, sources of financing, and exit strategy.
        `,
        activities: {
          startupcosts: {
            title: 'Startup Costs',
            description: `
            <ul class="activity-description-list">
              <li>What are your estimated costs to start this business?</li>
              <li>Are these one-time costs (expenditures) or ongoing costs (expenses)?</li>
            </ul>
            `
          },
          salesprojections: {
            title: 'Sales Projections',
            description: `
            <ul class="activity-description-list">
              <li>What are your sales projections for the next three </li>years?
              <li>Where did you get the information to project financials?</li>
              <li>Are the projections reasonable?</li>
            </ul>
            `
          },
          incomeprojections: {
            title: 'Income Projections',
            description: `
            <ul class="activity-description-list">
              <li>What are your net income projections for the next three years?</li>
              <li>When will your company be profitable?</li>
            </ul>
            `
          },
          cashrequirements: {
            title: 'Cash Requirements',
            description: `
            <ul class="activity-description-list">
              <li>How much cash will be required to cover startup costs, operations, and/or growth?</li>
            </ul>`
          },
          sourcesoffinancing: {
            title: 'Sources of Financing',
            description: `
            <ul class="activity-description-list">
              <li>Based on cash requirements to start, maintain operations, and grow, will you seek debt or equity financing?</li>
              <li>How much is the cost of obtaining these funds?</li>
            </ul>
            `
          },
          exitstrategy: {
            title: 'Exit Strategy',
            description: `
            <ul class="activity-description-list">
              <li>What is your overall plan for growth?</li>
              <li>How will this plan enable you to obtain a wealthy harvest upon exit?</li>
              <li>What are your specific plans for going public, selling the business, merging the business, or do you have other strategies in mind?</li>
            </ul>
            `
          }
        }
      }
    }
  },
  businessmodelcanvas: {
    title: 'Business Model Canvas',
    icon: 'fa fa-th',
    shortDescription: 'Visualize your business concept, see new opportunities, and design or redesign your business model with this template.',
    description: `The Business Model Canvas is a template that helps entrepreneurs identify the core elements of their business. It can help you to organize and visualize your business concept, see new opportunities, or even redesign your existing business model.

    Now a global standard, the Business Model Canvas template was developed by a team of researchers from Switzerland at <a href="https://strategyzer.com/canvas/business-model-canvas">Strategyzer</a> and has been refined with input from over 400 professionals who study or create startups. Like an artist’s color wheel, the Business Model Canvas does not prevent the entrepreneur from coming up with unique combinations that are relevant to his or her own circumstances.

    Use the Business Model Canvas tool to help you sketch out your business model. You may even find it useful to sketch out multiple models and compare them.

    <div class="tool-features">
      <p>Tool features to note:</p>

      <p><b>View in course.</b> If you get stuck or need help while writing, you can find relevant course content by clicking the “View in course” link to the left of the Save button.</p>

      <p><b>Saving.</b> You can edit directly here or in the course itself. Any changes you make will be saved in both places.</p>

      <p><b>Downloading.</b> To download go to the “Preview Mode” link in the top right corner of the Workspace. This will be especially useful to you if you want to save a copy to use outside of the course or further refine your work using your own word processing software.</p>
    </div>
`,
    activitiesCount: 9,
    subDeliverables: {
      businessmodelcanvasdefault: {
        activities: {
          valueproposition: {
            title: 'Value Proposition',
            description: `What makes your product or service valuable to a customer?
            <br><br>
            Your answer should communicate the unique value your product or service offers your target customers.`
          },
          customersegments: {
            title: 'Target Customers',
            description: 'Who will benefit from your value proposition?<br><br>Your answer may include a variety of potential segments. To maintain focus, include up to three customer segments which you feel your product/service most strongly would benefit.'
          },
          customerrelationships: {
            title: 'Customer Relationships',
            description: 'What type of experience links your value proposition and target customers?<br><br>Include the type of relationship (eg, Functional, Emotional, Advisory) in your answer.'
          },
          distributionchannels: {
            title: 'Distribution Channels',
            description: 'How do you deliver your value proposition to target customers?<br><br>Double check that your distribution channels will serve each of the customer segments you identified previously.'
          },
          revenuestreams: {
            title: 'Revenue Streams',
            description: 'What are your sources of revenue?<br><br>Having only one revenue stream is a sufficient and you don’t necessarily need multiple streams. But, if you only have one revenue stream, it may be a signal to think about other revenue opportunities.'
          },
          differentiators: {
            title: 'Key Activities',
            description: 'What are the key activities that make your company different and create a competitive advantage?<br><br>You don’t need to identify all the activities your business may perform, just the activities which are unique or special.'
          },
          assets: {
            title: 'Assets',
            description: 'What resources do you have that can generate value?<br><br>Not every asset category should be represented, just those which you expect to generate revenue or value, or those which have the potential to generate revenue or value.'
          },
          keypartners: {
            title: 'Key Partners',
            description: 'Which partner relationships are critical to your company’s success?<br><br>Your business will have a lot of stakeholders, but just include your key business partners, mentors, or financial partners which are special to your business here.'
          },
          coststructure: {
            title: 'Cost Structure',
            description: 'What costs are needed upfront to start the business and how will costs change over time?<br><br>Every new business will incur some startup costs and assume future operational costs. Try to identify the fixed and variable costs that you will encounter when starting and growing the business.'
          }
        }
      }
    }
  },
  pitchdeck: {
    title: 'Pitch',
    icon: 'fa fa-picture-o',
    shortDescription: 'Develop the clear and concise story of your business, to be shared with friends, potential customers, investors, and the market at large.',
    description: `Throughout the life of your business you’re going to be pitching it. These pitches can come in many forms. You may be just in an ideation phase and pitching your thoughts to a friend over coffee, or your business may be well established and growing and pitching your business to investors or internal stakeholders.

    The way that you describe your business—everything from the problem it solves to it future milestones—will change over time as your business grows. It will also change depending on who you are talking to—if you’re talking to an investor you’ll pitch who you are and what you do in one way. If you’re talking to a client, you’ll tailor your talking points to meet their needs.

    The important thing is to think through the way you want to talk about your key points to others when getting feedback.

    This Pitch tool is a space where you can reflect and collect your key pitch messages. As you go throughout the course, you’ll be pointed to different activities that are part of this tool. Use this tool to help you refine your thinking as you go along, and also come back to update it as your thinking changes.

    Why? Because things will change! The problem you solve may change, the way you describe it may change. Being able to articulate your current thoughts will give you the best jumping off point to refine your ideas and learn about your business from talking about it to others — no matter what stage you are in.

    <div class="tool-features">
      <p>Tool features to note:</p>

      <p><b>View in course.</b> If you get stuck or need help while writing, you can find relevant course content by clicking the “View in course” link to the left of the Save button.</p>

      <p><b>Saving.</b> You can edit directly here or in the course itself. Any changes you make will be saved in both places.</p>

      <p><b>Downloading.</b> To download go to the “Preview Mode” link in the top right corner of the Workspace. This will be especially useful to you if you want to save a copy to use outside of the course or further refine your work using your own word processing software.</p>
    </div>
    `,
    activitiesCount: 5,
    subDeliverables: {
      pitchdeckdefault: {
        activities: {
          businessstatement: {
            title: 'Business Concept Statement',
            description: `What’s your business concept? Describe your business in a paragraph. Make sure to answer the following questions:
              <ul class="activity-description-list" style="margin-left: 7.5%; margin-right: 8%; margin-bottom: 16px;">
                <li>What is the customer problem that you are solving?</li>
                <li>How does your product/service solve this problem for your customer?</li>
                <li>How is it different from other products/services?</li>
                <li>What is your competitive advantage?</li>
                <li>Who will buy it?</li>
                <li>Why will they buy it from you?</li>
              </ul>
            `
          },
          elevatorpitch: {
            title: 'Elevator Pitch',
            description: `How will you respond when someone asks, "What do you do?" or, "Tell me about your business"? Answer: Your elevator pitch. This is a short, clear statement that explains what your business does and why it is unique.
            <br><br>
            To create an elevator pitch:
            <br><br>
            <b>1.</b>Answer the question "What does the business do?"<br>
            <b>2.</b>Use the words work with, want, or offer.<br>
            <b>3.</b>State how your business solves a problem or offers a solution.<br>
            <b>4.</b>Describe what makes your business unique.<br>
            <b>5.</b>Tell a quick story.<br>
            <br>
            <div class="activity tip">
              <div class="tip-content">
                <div class="highlight">
                  Tip:
                </div>
                You may want to create multiple versions, try them out, get feedback, and refine.
              </div>
            </div>
            <br>
            <div class="after-tip-content">
              Write your elevator pitch here:
            </div>
            `
          },
          tweetablebusiness: {
            title: 'Tweetable Pitch',
            description: `You’re welcome to market your business using whichever channel or social media site you desire, but since Twitter restricts your tweets to 140 characters (that’s letters, spaces, symbols and punctuation), it may make sense to develop a Tweetable pitch for your business.
            <br><br>
            For example:
            <img class="activity-image" src="/assets/images/tweetablepitch.png" >
            <br><br>
            Can you describe the value you’ll bring to your customers in 140 characters? Try it out!
            <br><br>
            <div class="activity tip">
              <div class="tip-content">
                <div class="highlight">
                  Tip:
                </div>
                Use this <a href="http://www.twitter-character-counter.com/">Character Counter</a> to help you know how many characters you have left when composing your pitch.
              </div>
            </div>
            <br>
            <div class="after-tip-content">
              Write your Tweetable pitch here:
            </div>
            `
          },
          businessname: {
            title: 'Brand Name',
            description: `
            When talking about your idea or pitching your idea, your brand name is one of the key elements.
            <br><br>
            If you're sure what you want to call your brand and you've tested it with potential customers—great! If you're still debating, don't worry—you are not alone. This can be one of the trickiest things to figure out.
            Use the space below to record your ideas for your brand name.
            <br><br>
            <div class="activity tip">
              <div class="tip-content">
                <div class="highlight">
                  Tip:
                </div>
                Test out your potential brand name with your potential customers—you'll want to make sure it resonates with them.
              </div>
            </div>
            <br>
            <div class="after-tip-content">
              What’s the name of your company?
            </div>
            `
          },
          mystory: {
            title: 'Company Story',
            description: `
            As Craig Wortmann notes in his <a href="https://www.youtube.com/watch?v=E0r_9FZg31M">Kauffman Founders School series on Entrepreneurial Selling</a>, stories help provide context and connect your customers to the emotion(s) surrounding your product/service. Rather than citing the facts, how will you tell a compelling story that makes people feel something about your company?
            <br><br>
            To think about your company’s story, reflect on the following:
            <ul class="activity-description-list" style="margin-left: 7.5%; margin-right: 8%;">
              <li>Do you rely on facts to make a case for your business?</li>
              <li>Which important facts could be captured in a compelling story involving your business?</li>
              <li>Are there different stories that could illustrate different key facts?</li>
              <li>How do you capture the stories that you experience?</li>
              <li>How do you remember them?</li>
            </ul>
            <p class="hide-in-preview" style="margin-top: 16px; margin-left: 6%; margin-right: 8%;">Start working on the stories that will bring your business to life, below. Once you have multiple stories, you might consider organizing them into a <a href="https://www.youtube.com/watch?v=gtYl2uE62i4">story matrix</a></p>.
            `
          }
        }
      }
    }
  },
  financialforecast: {
    title: 'Financial Forecast',
    icon: 'fa fa-line-chart',
    shortDescription: 'Create a financial forecast that will help you predict, measure, and analyze the growth of your business for the next 3 years.',
    description: `
    As part of this course, you will develop a simplified financial model that will result in an <b>income statement</b> and provide the information necessary to understand <b>profitability</b>, <b>cash flow</b>, and your <b>funding needs</b>. This will get you started and provide a foundation for fully developing these statements in the future.

    As you're creating your own financial model, you'll be able to reference Run KC's example model. There are links below to download both the Run KC example model and a blank template model which you will need to complete the activities. For your reference, here's an overview of where you can find the activities:

    <b>Commit</b>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/84a9d56620d04b9da1efa239976ecdf4/036b16454ba047fb9ace91eeeec0123e/?activate_block_id=block-v1%3AKauffman%2Bnv%2Bnv%2Btype%40sequential%2Bblock%40036b16454ba047fb9ace91eeeec0123e">Activity 1: Sales Projections and Assumptions</a>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/84a9d56620d04b9da1efa239976ecdf4/edb05eef22cd4ebd8dccf6d74502987c/">Activity 2: Startup Costs Projections and Assumptions <LINK></a>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/84a9d56620d04b9da1efa239976ecdf4/edb05eef22cd4ebd8dccf6d74502987c/">Activity 3: Cost of Goods Sold Projections and Assumptions <LINK></a>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/84a9d56620d04b9da1efa239976ecdf4/edb05eef22cd4ebd8dccf6d74502987c/">Activity 4: Operating Expenses Projections and Assumptions <LINK></a>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/84a9d56620d04b9da1efa239976ecdf4/edb05eef22cd4ebd8dccf6d74502987c/4?activate_block_id=block-v1%3AKauffman%2Bnv%2Bnv%2Btype%40html%2Bblock%4079bded5491c442248e76f5c3c804bf8e">Activity 5: Projecting Net Income <LINK></a>

    <b>Refine</b>
    <a href="https://beta.fasttrac.org/courses/course-v1:Kauffman+nv+nv/courseware/300307d3d2a64d54990a0901380be251/5042aa86ce4445a58e3d08e74c37aef3/3?activate_block_id=block-v1%3AKauffman%2Bnv%2Bnv%2Btype%40vertical%2Bblock%40bd2623130903449f9da95b54a24e9176">Activity 6: Cash Flow Projections <LINK></a>
    `,
    activitiesCount: 0,
    subDeliverables: {
      financialforecastdefault: {
        title: 'Financial Model Download',
        description: `
        Download a copy of the <b>FastTrac Financial Model template</b> and <b>Run KC Example Financial Model</b> in whatever way works best for you. Here are the options:<br>
        <br>
        <b>If you have Microsoft Excel:</b><br>
        <br>
        <a href="/assets/spreadsheets/FastTrac_Financial_Model_xls.xlsx">FastTrac Financial Model template Excel Workbook (.xlsx)</a><br>
        <a href="/assets/spreadsheets/FastTrac_RunKC_Example_Financial_Model_xls.xls">Run KC Example Financial Model Excel Workbook (.xlsx)</a><br>
        <br>
        <b>If you have an older version of Microsoft Excel:</b><br>
        <br>
        <a href="/assets/spreadsheets/FastTrac_Financial_Model.xlsx">FastTrac Financial Model template Excel Workbook (1997-2004) (.xls)</a><br>
        <a href="/assets/spreadsheets/FastTrac_RunKC_Example_Financial_Model.xlsx">Run KC Example Financial Model Excel Workbook (1997-2004) (.xls)</a><br>
        <br>
        <b>If you have a Google account:</b><br>
        <br>
        <a href="https://docs.google.com/spreadsheets/d/1BchCjUNtrd2HxATCX0C2EB_1uj8mpzSWzyYYig0LmvY/edit#gid=0">FastTrac Financial Model template Google Sheet</a><br>
        <a href="https://docs.google.com/spreadsheets/d/19TZPN_DjKnXEUSsT-ntDDFkZdrXLZGDcObS2KfLiVyA/edit?usp=sharing">Run KC Example Financial Model Google Sheet</a><br>
        <br>
        Note: These Google Sheets are <b>view only</b>. To make your own copy where you can edit, open the Google Sheet then go to the <b>File</b> menu and select <b>Make a Copy</b>.
        `,
        activities: {}
      }
    }
  }
};

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
