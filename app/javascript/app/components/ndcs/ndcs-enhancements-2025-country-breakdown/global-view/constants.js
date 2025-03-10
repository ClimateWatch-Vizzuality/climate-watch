export const SETTINGS = {
  chartMinYear: 2014, // 2014 per designs, 1990 per data
  chartMaxYear: 2035, // This should not be changed
  chartMargins: {
    top: 60,
    right: 0,
    bottom: 40,
    left: 80
  }
};

export const CONDITIONAL_SWITCH_OPTIONS = [
  {
    name: 'Unconditional NDCs',
    value: 'unconditional'
  },
  {
    name: 'Conditional NDCs',
    value: 'conditional'
  }
];

export const TAGS_DATA = {
  conditional: [
    {
      type: 'historical-line',
      label: 'Historical Emissions',
      color: 'gray'
    },
    {
      type: 'projection-line',
      label: 'Estimated emissions based on previous conditional NDCS',
      color: 'gray'
    }
  ],
  unconditional: [
    {
      type: 'historical-line',
      label: 'Historical Emissions',
      color: 'gray'
    },
    {
      type: 'projection-line',
      label: 'Estimated emissions based on previous unconditional NDCS',
      color: 'gray'
    }
  ]
};
