import { ALL_SELECTED } from 'data/constants';

export const DATA_EXPLORER_BLACKLIST = [
  'id',
  'iso_code3',
  'iso_code2',
  'emissions',
  'document_type',
  'language'
];

export const FIRST_TABLE_HEADERS = {
  'historical-emissions': ['country', 'data_source', 'sector', 'gas', 'unit'],
  'ndc-content': [
    'country',
    'categories', // remove when it's splitted into global and overview category
    'global_category',
    'overview_category',
    'sector',
    'subsector',
    'indicator',
    'value',
    'source',
    'indicator_name',
    'indicator_id'
  ],
  'lts-content': [
    'country',
    'categories', // remove when it's splitted into global and overview category
    'global_category',
    'overview_category',
    'sector',
    'subsector',
    'indicator',
    'value',
    'source',
    'indicator_name',
    'indicator_id'
  ],
  'ndc-sdg-linkages': [
    'country',
    'sdg',
    'sdg_target',
    'indc_text',
    'status',
    'sector',
    'climate_response',
    'type_of_information'
  ],
  'emission-pathways': [
    'location',
    'model',
    'scenario',
    'category',
    'subcategory',
    'indicator',
    'composite_name',
    'definition',
    'unit'
  ]
};

export const FILTER_DEFAULTS = {
  'historical-emissions': {
    'data-sources': 'CAIT',
    regions: ALL_SELECTED,
    gases: 'All GHG',
    sectors: 'Total including LUCF'
  },
  'ndc-content': {
    categories: 'UNFCCC Process',
    indicators: ALL_SELECTED,
    sectors: ALL_SELECTED,
    countries: ALL_SELECTED
  },
  'lts-content': {
    categories: 'Communication of Long-term Strategy',
    indicators: ALL_SELECTED,
    sectors: ALL_SELECTED,
    countries: ALL_SELECTED
  },
  'ndc-sdg-linkages': {
    countries: ALL_SELECTED,
    goals: ALL_SELECTED,
    targets: ALL_SELECTED,
    sectors: ALL_SELECTED
  },
  'emission-pathways': {
    locations: ALL_SELECTED,
    models: ALL_SELECTED,
    scenarios: ALL_SELECTED,
    categories: ALL_SELECTED,
    subcategories: ALL_SELECTED,
    indicators: ALL_SELECTED
  }
};

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
  },
  'lts-content': {
    label: 'lts_content',
    moduleName: 'lts-content',
    linkLabel: 'lts_explore',
    linkName: 'lts-explore'
  }
};

export const DATA_EXPLORER_METHODOLOGY_SOURCE = {
  'historical-emissions': {
    PIK: ['historical_emissions_pik'],
    CAIT: ['historical_emissions_cait'],
    'UNFCCC Annex I': ['historical_emissions_unfccc'],
    'UNFCCC Non-Annex I': ['historical_emissions_unfccc'],
    GCP: ['historical_emissions_gcp']
  },
  'ndc-sdg-linkages': ['ndc_sdg_all indicators'],
  'ndc-content': ['ndc_cw', 'ndc_wb', 'ndc_die'],
  'lts-content': ['lts'],
  'emission-pathways': [null] // model, scenario and indicator related metadata
};

export const DATA_EXPLORER_FILTERS = {
  'historical-emissions': ['data-sources', 'regions', 'sectors', 'gases'],
  'ndc-sdg-linkages': [
    'countries',
    'goals',
    'targets',
    'status',
    'sectors',
    'climate_response',
    'type_of_information'
  ],
  'emission-pathways': [
    'locations',
    'models',
    'scenarios',
    'categories',
    'subcategories',
    'indicators'
  ],
  'ndc-content': ['categories', 'indicators', 'sectors', 'countries'], // TODO: add focus when ready
  'lts-content': ['categories', 'indicators', 'sectors', 'countries'] // TODO: add focus when ready
};

// The dropdown named as the keys will be deleted if one of the values column changes
// and will only be selectable if all the values are selected
export const DATA_EXPLORER_DEPENDENCIES = {
  'historical-emissions': {
    regions: ['data-sources'],
    sectors: ['data-sources'],
    gases: ['data-sources']
  },
  'emission-pathways': {
    models: ['locations'],
    scenarios: ['models', 'locations'],
    categories: ['scenarios', 'models', 'locations'],
    subcategories: ['categories', 'scenarios', 'models', 'locations'],
    indicators: [
      'subcategories',
      'categories',
      'scenarios',
      'models',
      'locations'
    ]
  }
};

export const DATA_EXPLORER_EXTERNAL_PREFIX = 'external';
export const DATA_EXPLORER_TO_MODULES_PARAMS = {
  'historical-emissions': {
    data_sources: { key: 'source' },
    gases: { key: 'gases' },
    sectors: { key: 'sectors' },
    regions: { key: 'regions' },
    start_year: { key: 'start_year' },
    end_year: { key: 'end_year' }
  },
  'ndc-sdg-linkages': {
    goals: {
      key: 'goal',
      idLabel: 'number'
    }
  },
  'ndc-content': {
    sectors: {
      key: 'sectors'
    },
    categories: {
      key: 'category'
    },
    indicators: {
      key: 'indicator'
    }
  },
  'lts-content': {
    sectors: {
      key: 'sectors'
    },
    categories: {
      key: 'category'
    },
    indicators: {
      key: 'indicator'
    }
  },
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
    },
    subcategories: {
      key: 'subcategory'
    }
  }
};

export const MULTIPLE_LEVEL_SECTION_FIELDS = {
  'historical-emissions': [
    {
      key: 'sectors',
      multiselect: true
    }
  ],
  'ndc-content': [
    {
      key: 'sectors'
    },
    {
      key: 'categories'
    }
  ],
  'lts-content': [
    {
      key: 'sectors'
    },
    {
      key: 'categories'
    }
  ]
};

export const GROUPED_OR_MULTI_SELECT_FIELDS = {
  'historical-emissions': [
    {
      key: 'regions',
      label: 'Countries and Regions',
      groups: [
        { groupId: 'regions', title: 'Regions' },
        { groupId: 'countries', title: 'Countries' }
      ]
    },
    { key: 'gases' }
  ],
  'emission-pathways': [{ key: 'scenarios' }]
};

export const DATA_EXPLORER_PER_PAGE = 200;

export const SECTION_NAMES = {
  pathways: 'emission-pathways',
  historicalEmissions: 'historical-emissions'
};

export const FILTER_NAMES = {
  models: 'models',
  scenarios: 'scenarios',
  indicators: 'indicators',
  categories: 'categories',
  subcategories: 'subcategories',
  regions: 'regions'
};

export const FILTERED_FIELDS = {
  'historical-emissions': {
    sectors: [
      {
        parent: 'data-sources',
        parentId: 'sector_ids',
        id: 'id'
      }
    ],
    gases: [
      {
        parent: 'data-sources',
        parentId: 'gas_ids',
        id: 'id'
      }
    ]
  },
  'ndc-sdg-linkages': {
    targets: [
      {
        parent: 'goals',
        parentId: 'value',
        id: 'goal_id'
      }
    ]
  },
  'ndc-content': {
    indicators: [
      {
        parent: FILTER_NAMES.categories,
        parentId: 'id',
        id: 'category_ids'
      }
    ]
  },
  'lts-content': {
    indicators: [
      {
        parent: FILTER_NAMES.categories,
        parentId: 'id',
        id: 'category_ids'
      }
    ]
  },
  'emission-pathways': {
    scenarios: [
      {
        parent: 'models',
        idObject: 'model',
        id: 'id'
      }
    ],
    indicators: [
      {
        parent: FILTER_NAMES.categories,
        idObject: 'category',
        id: 'id'
      },
      {
        parent: 'scenarios',
        parentId: 'indicator_ids',
        id: 'id'
      }
    ]
  }
};
export const NON_COLUMN_KEYS = ['start_year', 'end_year'];

export const POSSIBLE_LABEL_FIELDS = [
  'label',
  'value',
  'name',
  'full_name',
  'wri_standard_name',
  'cw_title',
  'title',
  'slug',
  'number'
];

export const POSSIBLE_VALUE_FIELDS = [
  'slug',
  'id',
  'value',
  'iso_code3',
  'iso'
];

export const FIELD_ALIAS = {
  'historical-emissions': { 'data-sources': 'Data sources' },
  'ndc-sdg-linkages': { goals: 'sdg', targets: 'sdg_target' }
};

export const FILTERS_DATA_WITHOUT_MODEL = {
  'ndc-sdg-linkages': ['status', 'climate_response', 'type_of_information']
};

export const DATA_EXPLORER_TABLE_COLUMNS_WIDTH = {
  'historical-emissions': 100,
  'emission-pathways': 100
};
