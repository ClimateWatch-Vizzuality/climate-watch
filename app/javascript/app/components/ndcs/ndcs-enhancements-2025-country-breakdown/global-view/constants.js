export const SETTINGS = {
  chartMinYear: 2014, // 2014 per designs, 1990 per data
  chartMaxYear: 2035, // This should not be changed
  chartMargins: {
    top: 20,
    right: 0,
    bottom: 40,
    left: 80
  }
};

export const CONDITIONAL_SWITCH_OPTIONS = [
  {
    name: 'Unconditional NDC',
    value: 'unconditional'
  },
  {
    name: 'Conditional NDC',
    value: 'conditional'
  }
];

export const TAGS_DATA = [
  {
    label: 'Historical Emissions',
    color: 'gray'
  },
  {
    label: 'Business As Usual Projection',
    color: 'gray'
  },
  {
    label: '2025 NDC Emissions Reduction',
    color: 'blue'
  }
];
