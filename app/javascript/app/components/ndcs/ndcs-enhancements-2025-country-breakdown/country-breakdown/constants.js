import BaselineEmissionsComponent from './country-chart/baseline-emissions';
import TargetEmissionsComponent from './country-chart/target-emissions';

export const BASELINE_YEARS = [1990, 2005, 2019];
export const TARGET_YEARS = [2030, 2035];
export const CONDITIONAL_OPTIONS = ['unconditional', 'conditional'];

export const CHART_COMPONENTS = {
  baseline: BaselineEmissionsComponent,
  target: TargetEmissionsComponent
};

export const CHART_AXES = {
  baseline: {
    unit: '%',
    title: 'Percent Change in Emissions relative to Base Year'
  },
  target: {
    unit: 'MtCO2e',
    title: 'Difference in Absolute Emissions compared to 2030 targets'
  }
};

export const SETTINGS = {
  chartMargins: {
    top: 20,
    right: 0,
    bottom: 76,
    left: 104
  }
};

export const VIEW_OPTIONS = [
  { label: 'Base Year Comparison', value: 'baseline' },
  { label: '2035-2030 Target Comparison', value: 'target' }
];

export const LOCATION_GROUPS = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Parties'
  }
];

export const BASELINE_YEAR_OPTIONS = (() =>
  BASELINE_YEARS?.map(year => ({
    label: `${year} Historical Emissions`,
    value: year
  })))();

export const CONDITIONAL_SWITCH_OPTIONS = (() =>
  CONDITIONAL_OPTIONS?.map(type => ({
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} NDCS`,
    value: type
  })))();
