export const DATA_EXPLORER_BLACKLIST = [
  'id',
  'iso_code3',
  'iso_code2',
  'emissions'
];
export const DATA_EXPLORER_FIRST_TABLE_HEADERS = [
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

export const DATA_EXPLORER_SECTIONS = {
  'historical-emissions': {
    label: 'historical_emissions',
    moduleName: 'ghg-emissions'
  },
  'ndc-sdg-linkages': {
    label: 'ndc_sdg',
    moduleName: 'ndcs-sdg'
  },
  'emission-pathways': {
    label: 'emission_pathways',
    moduleName: 'pathways'
  },
  'ndc-content': {
    label: 'ndc_content',
    moduleName: 'ndcs-content'
  }
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
    'subcategories',
    'indicators'
  ],
  'ndc-content': ['categories', 'indicators', 'sectors', 'countries']
};

export const DATA_EXPLORER_DEPENDENCIES = {
  'emission-pathways': {
    indicators: ['categories'],
    scenarios: ['models'],
    subcategories: ['categories']
  }
};

export const DATA_EXPLORER_EXTERNAL_PREFIX = 'external';
export const DATA_EXPLORER_TO_MODULES_PARAMS = {
  'historical-emissions': {
    data_sources: { key: 'source' },
    gwps: { key: 'version' }
  },
  'ndc-sdg-linkages': {
    goals: {
      key: 'goal',
      idLabel: 'number'
    }
  },
  'ndc-content': {},
  'emission-pathways': {
    locations: {
      key: 'currentLocation',
      idLabel: 'id',
      currentId: 'iso_code'
    },
    models: {
      key: 'model'
    },
    scenarios: {
      key: 'scenario'
    },
    indicators: {
      key: 'indicator'
    },
    categories: {
      key: 'category'
    }
  }
};

export const DATA_EXPLORER_MULTIPLE_LEVEL_SECTIONS = {
  'ndc-content': [{ key: 'sectors' }, { key: 'categories' }]
};

export const DATA_EXPLORER_PER_PAGE = 20;

export default {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_FIRST_TABLE_HEADERS,
  DATA_EXPLORER_SECTIONS,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_DEPENDENCIES,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_TO_MODULES_PARAMS,
  DATA_EXPLORER_MULTIPLE_LEVEL_SECTIONS,
  DATA_EXPLORER_PER_PAGE
};
