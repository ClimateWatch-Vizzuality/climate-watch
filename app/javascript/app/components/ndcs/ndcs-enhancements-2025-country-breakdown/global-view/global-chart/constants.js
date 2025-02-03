export const TOOLTIPS = {
  historical: {
    marker: {
      id: 'global-historical-marker-tooltip',
      label: '2021 - Historical Emissions'
    }
  },
  targets: {
    2035: {
      '2.0C': {
        id: 'global-targets-2035-2_0C-tooltip',
        label: '2035 - 2°C Target'
      },
      '1.5C': {
        id: 'global-targets-2035-1_5-tooltipC',
        label: '2035 - 1.5°C Target'
      }
    }
  },
  reductions: {
    emissionsReductions: {
      id: 'global-emissions-reductions-tooltip',
      label: 'Emissions Reductions from 2020 NDCs',
      markers: {
        upperLimit: {
          id: 'global-emissions-reductions-upper-limit-tooltip',
          label: '2030 - BAU'
        },
        lowerLimit: {
          id: 'global-emissions-reductions-lower-limit-tooltip',
          label: '2030 - Unconditional 2020 NDC'
        }
      }
    },
    additionalReductions: {
      id: 'global-emissions-additional-reductions-tooltip',
      label: '2035 - Emissions Reductions from 2025 NDCs'
    }
  },
  targetGaps: {
    upperLimit: {
      id: 'global-target-gaps-upper-limit-tooltip',
      label: '2035 - Emissions Gap to 2°C'
    },
    lowerLimit: {
      id: 'global-target-gaps-lower-limit-tooltip',
      label: '2035 - Emissions Gap to 1.5°C'
    }
  }
};
