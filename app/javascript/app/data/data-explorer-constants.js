export const DATA_EXPLORER_BLACKLIST = [
  'id',
  'iso_code3',
  'iso_code2',
  'emissions'
];

export const FIRST_TABLE_HEADERS = {
  'historical-emissions': ['region', 'data_source', 'sector', 'gas', 'unit'],
  'ndc-content': [
    'country',
    'categories', // remove when it's splitted into global and overview category
    'global_category',
    'overview_category',
    'sector',
    'subsector',
    'indicator_id',
    'indicator',
    'value'
  ],
  'ndc-sdg-linkages': [
    'country',
    'goal',
    'target',
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

const ALL_COUNTRIES =
  'AFG,ALB,DZA,AND,AGO,ATG,ARG,ARM,AUS,AUT,AZE,BHS,BHR,BGD,BRB,BLR,BEL,BLZ,BEN,BTN,BOL,BIH,BWA,BRA,BRN,BGR,BFA,BDI,KHM,CMR,CAN,CPV,CAF,TCD,CHL,CHN,COL,COM,COK,CRI,HRV,CUB,CYP,CZE,CIV,COD,DNK,DJI,DMA,DOM,ECU,EGY,SLV,GNQ,ERI,EST,ETH,EU28,FJI,FIN,FRA,GAB,GMB,GEO,DEU,GHA,GRC,GRD,GTM,GIN,GNB,GUY,HTI,HND,HUN,ISL,IND,IDN,IRN,IRQ,IRL,ISR,ITA,JAM,JPN,JOR,KAZ,KEN,KIR,KWT,KGZ,LAO,LVA,LBN,LSO,LBR,LBY,LIE,LTU,LUX,MKD,MDG,MWI,MYS,MDV,MLI,MLT,MHL,MRT,MUS,MEX,FSM,MDA,MCO,MNG,MNE,MAR,MOZ,MMR,NAM,NRU,NPL,NLD,NZL,NIC,NER,NGA,NIU,PRK,NOR,OMN,PAK,PLW,PSE,PAN,PNG,PRY,PER,PHL,POL,PRT,QAT,COG,ROU,RUS,RWA,KNA,LCA,VCT,WSM,SMR,STP,SAU,SEN,SRB,SYC,SLE,SGP,SVK,SVN,SLB,SOM,ZAF,KOR,SSD,ESP,LKA,SDN,SUR,SWZ,SWE,CHE,SYR,TJK,TZA,THA,TLS,TGO,TON,TTO,TUN,TUR,TKM,TUV,UGA,UKR,ARE,GBR,USA,URY,UZB,VUT,VEN,VNM,YEM,ZMB,ZWE';

export const FILTER_DEFAULTS = {
  'historical-emissions': {
    source: 'CAIT - AR2',
    gases: 'All GHG',
    sectors: 'Total including LUCF',
    regions: ALL_COUNTRIES
  },
  'ndc-content': {},
  'ndc-sdg-linkages': {},
  'emission-pathways': {}
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

// Add the extra filters when they are available in the backend
export const DATA_EXPLORER_FILTERS = {
  'historical-emissions': ['source', 'regions', 'sectors', 'gases'],
  'ndc-sdg-linkages': [
    'countries',
    'goals',
    'targets',
    // 'status',
    'sectors'
    // 'climate_response',
    // 'type_of_information'
  ],
  'emission-pathways': [
    'locations',
    'models',
    'scenarios',
    'categories',
    'subcategories',
    'indicators'
  ],
  'ndc-content': ['categories', 'indicators', 'sectors', 'countries'] // TODO: add focus when ready
};

// The dropdown named as the keys will be deleted if one of the values column changes
export const DATA_EXPLORER_DEPENDENCIES = {
  'historical-emissions': {
    sectors: ['source']
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
export const MODULES_TO_DATA_EXPLORER_PARAMS = {
  'historical-emissions': {
    filter: 'filter',
    source: 'data-sources',
    version: 'gwps',
    breakBy: 'breakBy'
  }
};
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
    },
    subcategories: {
      key: 'subcategory'
    }
  }
};

export const MULTIPLE_LEVEL_SECTION_FIELDS = {
  'ndc-content': [{ key: 'sectors' }, { key: 'categories' }]
};

export const GROUPED_SELECT_FIELDS = {
  'historical-emissions': [
    {
      key: 'regions',
      label: 'Countries and Regions',
      groups: [
        { groupId: 'regions', title: 'Regions' },
        { groupId: 'countries', title: 'Countries' }
      ]
    }
  ]
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
  subcategories: 'subcategories'
};

export const FILTERED_FIELDS = {
  'historical-emissions': {
    sectors: [
      {
        parent: 'source',
        parentId: 'dataSourceId',
        id: 'data_source_id'
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
  'value',
  'name',
  'full_name',
  'wri_standard_name',
  'cw_title',
  'title',
  'slug',
  'number'
];

export const POSSIBLE_VALUE_FIELDS = ['id', 'value'];

export default {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_SECTIONS,
  DATA_EXPLORER_METHODOLOGY_SOURCE,
  DATA_EXPLORER_DEPENDENCIES,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_TO_MODULES_PARAMS,
  MULTIPLE_LEVEL_SECTION_FIELDS,
  GROUPED_SELECT_FIELDS,
  DATA_EXPLORER_PER_PAGE,
  POSSIBLE_LABEL_FIELDS,
  POSSIBLE_VALUE_FIELDS
};
