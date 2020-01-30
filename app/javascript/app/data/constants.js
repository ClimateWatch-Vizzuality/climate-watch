const { GFW_API } = process.env;
const { CW_API } = process.env;
const { ESP_API } = process.env;

export const LOGIN_URL = `${GFW_API}/auth/`;
export const LOGIN_PARAMS = `?applications=climate-watch&token=true&callbackUrl=${location.origin}${CW_API}/auth/login`;
export const LOGOUT_URL = '/auth/logout';
export const ESP_HOST = ESP_API.replace('/api/v1', '');

export const SOCIAL_APP_NAMES = ['twitter', 'facebook', 'google'];

export const CALCULATION_OPTIONS = {
  ABSOLUTE_VALUE: {
    label: 'Absolute value',
    value: 'ABSOLUTE_VALUE'
  },
  PER_CAPITA: {
    label: 'per Capita',
    value: 'PER_CAPITA'
  },
  PER_GDP: {
    label: 'per GDP',
    value: 'PER_GDP'
  }
};

export const QUANTIFICATION_COLORS = {
  BAU: '#113750',
  QUANTIFIED: '#ffc735',
  NOT_QUANTIFIABLE: '#868697'
};

export const QUANTIFICATIONS_CONFIG = {
  bau: { label: 'Business as usual', color: QUANTIFICATION_COLORS.BAU },
  quantified: {
    label: 'Quantified emissions targets',
    color: QUANTIFICATION_COLORS.QUANTIFIED
  },
  not_quantifiable: {
    label: 'Target not quantifiable',
    color: QUANTIFICATION_COLORS.NOT_QUANTIFIABLE
  }
};

export const DATA_SCALE = 1000000;

export const DEFAULT_EMISSIONS_SELECTIONS = {
  CAIT: {
    gas: 'All GHG',
    sector: 'Total including LUCF',
    location: 'WORLD'
  },
  PIK: {
    gas: 'KYOTOGHG',
    sector: 'Total excluding LULUCF',
    location: 'WORLD'
  },
  UNFCCC_AI: {
    gas: 'Aggregate GHGs',
    sector: 'Total GHG emissions with LULUCF',
    location: 'ANNEXI'
  },
  UNFCCC_NAI: {
    gas: 'Aggregate GHGs',
    sector: 'Total GHG emissions including LULUCF/LUCF',
    location: 'ANNEXI'
  },
  GCP: {
    gas: 'CO2',
    sector: 'Total fossil fuels and cement',
    location: 'WORLD'
  }
};

export const TOP_EMITTERS = [
  'CHN',
  'USA',
  'EUU',
  'IND',
  'RUS',
  'JPN',
  'BRA',
  'IDN',
  'CAN',
  'MEX'
];

export const CHART_COLORS = [
  '#00B4D2',
  '#0677B3',
  '#D2187C',
  '#FFB400',
  '#FF7800',
  '#FF88AA',
  '#AB0000',
  '#20D5B7'
];

export const CHART_COLORS_EXTENDED = [
  '#e6194B',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#42d4f4',
  '#f032e6',
  '#bfef45',
  '#FFC4D5',
  '#469990',
  '#e6beff',
  '#9A6324',
  '#800000',
  '#aaffc3',
  '#808000',
  '#FFDA80',
  '#000075'
];

export const OTHER_COLOR = '#999C9F';

export const NEW_CHART_COLORS_BASIC = [
  '#FFB800',
  '#0845CB',
  '#FF6C2F',
  '#008EEE',
  '#FF6CD0',
  '#2EC9DF',
  '#D2187C',
  '#6D40EA',
  '#999C9F',
  '#13C881'
];

export const NEW_CHART_COLORS = [
  '#FFB800',
  '#83A2E5',
  '#FF6C2F',
  '#FFB5E7',
  '#6D40EA',
  '#96E4EF',
  '#FFDB80',
  '#D2187C',
  '#13C881',
  '#008EEE',
  '#2EC9DF',
  '#FFB597',
  '#B69FF4',
  '#0845CB',
  '#FF6CD0',
  '#C1EEDC',
  '#999C9F',
  '#80C3F6',
  '#CCCDCF',
  '#E88BBD'
];

export const NEW_CHART_COLORS_EXTENDED = [
  '#FFB800',
  '#B69FF4',
  '#FF6C2F',
  '#FFB5E7',
  '#512FAF',
  '#2EC9DF',
  '#0E9560',
  '#B28000',
  '#999C9F',
  '#FFB597',
  '#D2187C',
  '#96E4EF',
  '#6D40EA',
  '#B24B20',
  '#0845CB',
  '#C1EEDC',
  '#0063A6',
  '#80C3F6',
  '#008EEE',
  '#FFDB80',
  '#9D115C',
  '#BF509B',
  '#FF6CD0',
  '#208C9B',
  '#83A2E5',
  '#032265',
  '#E88BBD',
  '#727477',
  '#13C881',
  '#CCCDCF'
];

export const GREY_CHART_COLORS = [
  '#68696B',
  '#818285',
  '#999B9D',
  '#ACAEB8',
  '#C3C4CD',
  '#E2E4EA'
];

export const COUNTRY_COMPARE_COLORS = ['#113750', '#00B4D2', '#D2187C'];

export const UNITS = {
  CO2e: 'CO<sub>2</sub>e'
};

export const DEFAULT_AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: UNITS.CO2e,
    format: 'number'
  }
};

export const ESP_BLACKLIST = {
  models: [
    'id',
    'scenario_ids',
    'indicator_ids',
    'availability',
    'current_version',
    'development_year',
    'expertise',
    'license'
  ],
  scenarios: ['id', 'model_id', 'indicator_ids'],
  indicators: ['id', 'parent_id']
};

export const ESP_HIGH_ROWS = ['description', 'purpose', 'Statement'];
export const ESP_MEDIUM_ROWS = [
  'composite_name',
  'definition',
  'technology_coverage',
  'purpose_or_objective',
  'socieconomics',
  'policy_coverage',
  'geographic_coverage',
  'reference'
];

export const ESP_NARROW_COLUMNS = ['year', 'unit', 'first', 'last'];
export const ESP_WIDE_COLUMNS = ['description', 'acronym_definition'];

export const FILTERS_BY_CATEGORY = {
  models: ['country'],
  scenarios: ['model'],
  indicators: ['category', 'subcategory']
};

export const MIN_ZOOM_SHOW_ISLANDS = '8';
export const PATH_LAYERS = {
  COUNTRIES: 'COUNTRIES',
  ISLANDS: 'ISLANDS',
  POINTS: 'POINTS'
};

export const CLIMATE_VULNERABILITY_DEFINITIONS = {
  climateRisks: `A risk is often represented as probability of occurrence of hazardous events or trends multiplied by the impacts
    if these events or trends occur.In this case, the impacts are the effects on natural and human systems of extreme weather and climate
    events and of climate change.Impacts generally refer to effects on lives, livelihoods, health, ecosystems, economies, societies,
    cultures, services, and infrastructure due to the interaction of climate changes or hazardous climate events occurring
    within a speciﬁc time period and the vulnerability of an exposed society or system.
    Source: IPCC, " Annex II: Glossary," 2014.[Online].Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.]`,
  exposed: `The presence of people, livelihoods, species or ecosystems, environmental functions, services, and resources,
     infrastructure, or economic, social, or cultural assets in places and settings that could be adversely affected.
      Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.`,
  sensitive: `The proportion of the population particularly susceptible to a climate change hazard. The extent to which it is dependent
    upon sectors negatively affected by climate hazards.
    Source: University of Notre Dame Global Adaptation Index, "Country Index Technical Report," 2015. [Online].
    Available: http://index.nd-gain.org:8080/documents/nd-gain_technical_document_2015.pdf.`,
  vulnerable: `The propensity or predisposition to be adversely affected. Vulnerability encompasses a variety of concepts
    and elements including exposure, sensitivity or and ability to adapt to extreme weather events.
    Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.`,
  resilient: `The capacity of social, economic and environmental systems to cope with a hazardous event or trend or disturbance,
    responding or reorganizing in ways that maintain their essential function, identity and structure, while also maintaining the capacity
    for adaptation, learning and transformation.
    Source: IPCC, “Working Group 2, Assessment Report 5, Summary for Policy Makers,” 2014. [Online.]
    Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg2/ar5_wgII_spm_en.pdf.`,
  ready: `Readiness measures a country's ability to leverage investments and convert them to adaptation actions.
    Source: University of Notre Dame Global Adaptation Index, "Country Index Technical Report," 2015.
    [Online]. Available: http://index.nd-gain.org:8080/documents/nd-gain_technical_document_2015.pdf`,
  adapt: `The process of adjustment to actual or expected climate and its effects. In human systems, adaptation seeks
    to moderate or avoid harm or exploit beneficial opportunities.
    Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf`
};

export const DISCLAIMER_SHOWN = 'disclaimerShown';

export const NDC_DOCUMENT_OPTIONS = [
  {
    label: 'All documents',
    value: 'all'
  },
  {
    label: 'NDC',
    value: 'ndc'
  },
  {
    label: 'INDC',
    value: 'indc'
  },
  {
    label: 'Second NDC',
    value: 'ndc2'
  }
];

export const CONTAINED_PATHNAME = 'contained';

export const LENSES_SELECTOR_INFO = {
  locations: `Every model has only a certain range of locations available. After one location is selected,
      all the locations which do not have a model in common with the selected location are filtered out.
      Hence, only the locations which have a model in common are displayed and are available for selection. `,
  models: `This drop-down menu shows only models which have information for all of the locations selected
      in the locations menu. You can select fewer locations to get a wider range of models.`
};

export const USERS_PROFESIONAL_SECTORS = [
  'Academic',
  'Commercial',
  'International Organization',
  'Media',
  'National Government',
  'NGO',
  'Other'
];

export const ALL_SELECTED = 'All Selected';
export const ALL_SELECTED_OPTION = { label: ALL_SELECTED, value: ALL_SELECTED };
export const NO_ALL_SELECTED_COLUMNS = [
  'breakBy',
  'chartType',
  'sources',
  'regions'
];

export const TOP_EMITTERS_OPTION = {
  iso: 'TOP',
  label: 'Top Emitters',
  value: 'TOP',
  expandsTo: TOP_EMITTERS,
  groupId: 'regions'
};

export const GAS_AGGREGATES = {
  'All GHG': ['CH4', 'CO2', 'F-Gas', 'N2O'],
  KYOTOGHG: ['CH4', 'CO2', 'HFCS', 'N2O'],
  'Aggregate GHGs': ['CH4', 'CO2', 'HFCs', 'N2O', 'PFCs', 'SF6'],
  'Aggregate F-gases': ['HFCs', 'PFCs', 'SF6']
};

export const GHG_TABLE_HEADER = {
  regions: 'Country/Region',
  gas: 'Gas',
  sector: 'Sector'
};

export const WRI_WEBSITE = 'https://www.wri.org/';
export const WRI_CLIMATE_BLOG = 'https://www.wri.org/blog-tags/14091';
export const RW_WEBSITE = 'https://resourcewatch.org/';

export const AGRICULTURE_TOTAL_EMISSIONS = 'Agriculture Emissions: Total';

export const AGRICULTURE_INDICATORS_NAMES = {
  total_pesticides_use: 'Pesticides consumption',
  total_fertilizers: 'Fertilizers consumption',
  value_added_agr: 'Agriculture value added',
  water_withdrawal: 'Water withdrawal',
  employment_agri_female: 'Female employment',
  employment_agri_male: 'Male employment',
  employment_agri_total: 'Total employment'
};

export const AGRICULTURE_INDICATORS_MAP_BUCKETS = {
  total_pesticides_use: {
    1: { name: 'No data', index: 0 },
    2: { name: '0 - 10 tonnes', index: 1 },
    3: { name: '10 - 100 tonnes', index: 2 },
    4: { name: '100 - 1,000 tonnes', index: 3 },
    5: { name: '> 1,000 tonnes', index: 4 }
  },
  total_fertilizers: {
    1: { name: 'No data', index: 0 },
    2: { name: '0 - 10,000 tonnes', index: 1 },
    3: { name: '10,000 - 100,000 tonnes', index: 2 },
    4: { name: '100,000 - 1 million tonnes', index: 3 },
    5: { name: '> 1 million tonnes', index: 4 }
  },
  value_added_agr: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  water_withdrawal: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_female: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_male: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_total: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  }
};
