export const TOOLTIPS = {
  historical: {
    marker: {
      id: 'global-historical-marker-tooltip',
      label: '2021 - Historical Emissions',
      color: '#999C9F'
    }
  },
  targets: {
    2035: {
      '2.0C': {
        id: 'global-targets-2035-2_0C-tooltip',
        label: '2035 - 2°C Target',
        color: '#579B7D'
      },
      '1.5C': {
        id: 'global-targets-2035-1_5-tooltipC',
        label: '2035 - 1.5°C Target',
        color: '#8CB73F'
      }
    }
  },
  reductions: {
    emissionsReductions: {
      id: 'global-emissions-reductions-tooltip',
      label: 'Emissions Reductions from 2020 NDCs',
      color: '#8F8F9F',
      markers: {
        upperLimit: {
          id: 'global-emissions-reductions-upper-limit-tooltip',
          label: '2030 - BAU',
          color: '#8F8F9F'
        },
        lowerLimit: {
          id: 'global-emissions-reductions-lower-limit-tooltip',
          label: '2030 - Unconditional 2020 NDC',
          color: '#8F8F9F'
        }
      }
    },
    additionalReductions: {
      id: 'global-emissions-additional-reductions-tooltip',
      label: '2035 - Emissions Reductions from 2025 NDCs',
      color: '#0845CB'
    }
  },
  targetGaps: {
    upperLimit: {
      id: 'global-target-gaps-upper-limit-tooltip',
      label: '2035 - Emissions Gap to 2°C',
      color: '#579B7D'
    },
    lowerLimit: {
      id: 'global-target-gaps-lower-limit-tooltip',
      label: '2035 - Emissions Gap to 1.5°C',
      color: '#8CB73F'
    }
  }
};
