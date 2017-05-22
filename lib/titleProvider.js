const lti = {
  NAMES: {
    businessplan: 'Business Plan',
    executivesummary: 'Executive Summary',
    venturedescription: 'Venture Description',
    managementandorganizationplan: 'Management and Organization Plan',
    marketingplan: 'Marketing Plan',
    financialplan: 'Financial Plan',
    legalformofbusiness: 'Legal Form of Business',
    managementteam: 'Management Team',
    advisoryboard: 'Advisory Board',
    recruitment: 'Recruitment',
    compensationandownership: 'Compensation and Ownership',
    incentiveplan: 'Incentive Plan',
    communication: 'Communication',
    infrastructure: 'infrastructure',
    operationsplan: 'Operations Plan',
    productplan: 'Product / Service Plan',
    purposeofproduct: 'Purpose of Product/Service',
    features: 'Features',
    stageofdevelopment: 'Stage of Development [Optional]',
    productlimitations: 'Product / Service Limitations',
    intellectualproperty: 'Intellectual Property',
    governmentapprovals: 'Government Approvals',
    industryprofile: 'Industry Profile',
    competitiveanalysis: 'Competitive Analysis',
    marketanalysis: 'Market Analysis',
    pricing: 'Pricing',
    marketpenetration: 'Market Penetration',
    startupcosts: 'Startup Costs',
    salesprojections: 'Sales Projections',
    incomeprojections: 'Income Projections',
    cashrequirements: 'Cash Requirements',
    sourcesoffinancing: 'Sources of Financing',
    exitstrategy: 'Exit Strategy'
  }
}

const getTitle = key => lti.NAMES[key] || key;

module.exports = getTitle;
