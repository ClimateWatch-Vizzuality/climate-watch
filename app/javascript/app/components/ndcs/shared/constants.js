import { CHART_NAMED_GRAY_COLORS } from 'app/styles/constants';

export const COUNTRY_STYLES = {
  default: {
    fill: CHART_NAMED_GRAY_COLORS.grayColor2,
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: CHART_NAMED_GRAY_COLORS.grayColor2,
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: CHART_NAMED_GRAY_COLORS.grayColor2,
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const NO_DOCUMENT_SUBMITTED_COUNTRIES = [
  { label: 'Greenland', iso: 'GRL' },
  { label: 'West Sahara', iso: 'ESH' }
];

export const SWITCH_OPTIONS = ['GHG Emissions', 'Vulnerability'].map(name => ({
  name,
  value: name
}));
