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
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126',
  '#2D9290',
  '#B25BD0',
  '#7EA759'
];

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
    'scenarios',
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

export const FILTERS_BY_CATEGORY = {
  models: ['license', 'time_horizon', 'time_step'],
  scenarios: ['model'],
  indicators: ['category', 'subcategory']
};

export const MIN_ZOOM_SHOW_ISLANDS = '8';
export const PATH_LAYERS = {
  COUNTRIES: 'COUNTRIES',
  ISLANDS: 'ISLANDS',
  POINTS: 'POINTS'
};

export default {
  CALCULATION_OPTIONS,
  TOP_EMITTERS,
  ALLOWED_SECTORS_BY_SOURCE,
  DEFAULT_EMISSIONS_SELECTIONS,
  CHART_COLORS,
  DEFAULT_AXES_CONFIG,
  DATA_SCALE,
  ESP_BLACKLIST,
  FILTERS_BY_CATEGORY,
  MIN_ZOOM_SHOW_ISLANDS,
  PATH_LAYERS
};
