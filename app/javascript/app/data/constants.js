const { GFW_API } = process.env;
const { CW_API } = process.env;

export const LOGIN_URL = `${GFW_API}/auth/login?applications=climate-watch&token=true&callbackUrl=${location.origin}${CW_API}/auth/login`;

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
  NOT_QUANTIFIABLE: '#b1b1c1'
};

export const QUANTIFICATIONS_CONFIG = {
  bau: { label: 'Business as usual', color: QUANTIFICATION_COLORS.BAU },
  quantified: {
    label: 'Quantified targets',
    color: QUANTIFICATION_COLORS.QUANTIFIED
  },
  not_quantifiable: {
    label: 'Target not quantifiable',
    color: QUANTIFICATION_COLORS.NOT_QUANTIFIABLE
  }
};

export const DATA_SCALE = 1000000;

export const ALLOWED_SECTORS_BY_SOURCE = {
  CAIT: [
    'Energy',
    'Industrial Processes',
    'Agriculture',
    'Waste',
    'Land-Use Change and Forestry'
  ],
  PIK: [
    'Energy',
    'Industrial process',
    'Solvent sector',
    'Agriculture',
    'Land-Use Change and Forestry',
    'Waste',
    'Other'
  ],
  UNFCCC: {
    AR2: [
      'Energy',
      'Industrial Processes',
      'Solvent and Other Product Use',
      'Agriculture',
      'Land-Use Change and Forestry',
      'Waste',
      'Other'
    ],
    AR4: [
      'Energy',
      'Industrial Processes and Product Use',
      'Agriculture',
      'Land Use, Land-Use Change and Forestry',
      'Waste',
      'Other'
    ]
  }
};

export const EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL = {
  CAIT: ['Bunker Fuels']
};

export const DEFAULT_EMISSIONS_SELECTIONS = {
  CAIT: {
    gas: 'All GHG',
    sector: 'Total including LUCF',
    location: 'WORLD'
  },
  PIK: {
    gas: 'All GHG',
    sector: 'Total including LULUCF',
    location: 'WORLD'
  },
  UNFCCC: {
    gas: 'Aggregate GHGs',
    sector: {
      AR2: 'Total GHG emissions including LULUCF/LUCF',
      AR4: 'Total GHG emissions with LULUCF'
    },
    location: 'ANNEXI'
  }
};

export const TOP_EMITTERS = [
  'CHN',
  'USA',
  'EU28',
  'IND',
  'RUS',
  'JPN',
  'BRA',
  'IDN',
  'CAN',
  'MEX',
  'TOP'
];

export const CHART_COLORS = [
  '#00B4D2',
  '#0677B3',
  '#D2187C',
  '#FFB400',
  '#FF7800',
  '#FF88AA',
  '#AB0000',
  '#20D5B7',
  '#383F45',
  '#CACCD0'
];

export const CHART_COLORS_EXTENDED = [
  '#00B4D2',
  '#0677B3',
  '#D2187C',
  '#FFB400',
  '#FF7800',
  '#FF88AA',
  '#AB0000',
  '#20D5B7',
  '#383F45',
  '#CACCD0',
  '#80DAE9',
  '#93BBD9',
  '#E98CBE',
  '#FFDA80',
  '#FFBC80',
  '#FFC4D5',
  '#D58080',
  '#90EADB',
  '#9C9FA2',
  '#E5E6E8'
];

export const COUNTRY_COMPARE_COLORS = ['#113750', '#00B4D2', '#D2187C'];

export const DEFAULT_AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: 'CO<sub>2</sub>e',
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

export const ESP_HIGH_ROWS = ['description'];
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
export const ESP_WIDE_COLUMNS = ['description'];

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
  }
];

export const LATEST_VERSION = 'AR4';
export const CONTAINED_PATHNAME = 'contained';

export const LENSES_SELECTOR_INFO = {
  locations: `Every model has only a certain range of locations available. After one location is selected,
      all the locations which do not have a model in common with the selected location are filtered out.
      Hence, only the locations which have a model in common are displayed and are available for selection. `,
  models: `This drop-down menu shows only models which have information for all of the locations selected
      in the locations menu. You can select fewer locations to get a wider range of models.`
};

export const DATA_EXPLORER_BLACKLIST = [
  'id',
  'iso_code3',
  'iso_code2',
  'emissions'
];
export const DATA_EXPLORER_FIRST_COLUMN_HEADERS = [
  'region',
  'data_source',
  'gwp',
  'sector',
  'gas',
  'location',
  'model',
  'scenario',
  'category',
  'subcategory',
  'indicator',
  'definition',
  'unit'
];

export const USERS_PROFESIONAL_SECTORS = [
  'Academic',
  'Commercial',
  'Internatioonal Organization',
  'Media',
  'National Government',
  'NGO',
  'Other'
];

export const DATA_EXPLORER_SECTION_NAMES = {
  'historical-emissions': 'historical_emissions',
  'ndc-sdg-linkages': 'ndc_sdg',
  'emission-pathways': 'emission_pathways',
  'ndc-content': 'ndc_content'
};

export const DATA_EXPLORER_METHODOLOGY_SOURCE = {
  'historical-emissions': {
    PIK: ['historical_emissions_pik'],
    CAIT: ['historical_emissions_cait'],
    UNFCCC: ['historical_emissions_unfccc']
  },
  'ndc-sdg-linkages': ['ndc_sdc_all indicators'],
  'ndc-content': ['ndc_cait', 'ndc_wb'],
  'emission-pathways': [null] // model, scenario and indicator related metadata
};

export const DATA_EXPLORER_FILTERS = {
  'historical-emissions': ['source', 'gases', 'regions', 'sectors'],
  'ndc-sdg-linkages': ['goals', 'targets', 'sectors', 'countries'],
  'emission-pathways': [
    'locations',
    'models',
    'scenarios',
    'categories',
    'indicators'
  ],
  'ndc-content': ['categories', 'indicators', 'sectors', 'countries']
};

export const DATA_EXPLORER_PATHWAYS_META_LINKS = {
  'meta locations': {
    href: '/api/v1/data/emission_pathways/locations',
    rel: 'meta locations'
  },
  'meta models': {
    href: '/api/v1/data/emission_pathways/models',
    rel: 'meta models'
  },
  'meta scenarios': {
    href: '/api/v1/data/emission_pathways/scenarios',
    rel: 'meta scenarios'
  },
  'meta categories': {
    href: '/api/v1/data/emission_pathways/categories',
    rel: 'meta categories'
  },
  'meta indicators': {
    href: '/api/v1/data/emission_pathways/indicators',
    rel: 'meta indicators'
  }
};

export const SOURCE_IPCC_VERSIONS = [
  { name: 'PIK - AR2', source_slug: 'PIK', version_slug: 'AR2' },
  { name: 'PIK - AR4', source_slug: 'PIK', version_slug: 'AR4' },
  { name: 'CAIT - AR2', source_slug: 'CAIT', version_slug: 'AR2' },
  { name: 'UNFCCC - AR2', source_slug: 'UNFCCC', version_slug: 'AR2' },
  { name: 'UNFCCC - AR4', source_slug: 'UNFCCC', version_slug: 'AR4' }
];

export default {
  CALCULATION_OPTIONS,
  QUANTIFICATION_COLORS,
  QUANTIFICATIONS_CONFIG,
  TOP_EMITTERS,
  ALLOWED_SECTORS_BY_SOURCE,
  EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL,
  DEFAULT_EMISSIONS_SELECTIONS,
  CHART_COLORS,
  DEFAULT_AXES_CONFIG,
  DATA_SCALE,
  ESP_BLACKLIST,
  ESP_HIGH_ROWS,
  ESP_MEDIUM_ROWS,
  ESP_NARROW_COLUMNS,
  ESP_WIDE_COLUMNS,
  FILTERS_BY_CATEGORY,
  MIN_ZOOM_SHOW_ISLANDS,
  PATH_LAYERS,
  CLIMATE_VULNERABILITY_DEFINITIONS,
  DISCLAIMER_SHOWN,
  NDC_DOCUMENT_OPTIONS,
  LATEST_VERSION,
  CONTAINED_PATHNAME,
  LENSES_SELECTOR_INFO,
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_FIRST_COLUMN_HEADERS,
  DATA_EXPLORER_SECTION_NAMES,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_PATHWAYS_META_LINKS,
  SOURCE_IPCC_VERSIONS,
  USERS_PROFESIONAL_SECTORS
};
