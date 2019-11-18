import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { PATH_LAYERS } from 'app/data/constants';
import { getSelectedIndicator } from 'components/ndcs/ndcs-map/ndcs-map-selectors';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;

export const getMaximumCountries = createSelector(
  getCountries,
  countries => countries.length
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryIds = Object.keys(categories);
    const preppedIndicators = sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets = createLegendBuckets(
            i.locations,
            i.labels,
            isos
          );
          return {
            label: i.name,
            value: i.slug,
            categoryIds: i.category_ids,
            locations: i.locations,
            legendBuckets
          };
        }),
        'value'
      ),
      'label'
    );

    let filteredIndicators = [];
    categoryIds.forEach(id => {
      filteredIndicators = filteredIndicators.concat(
        preppedIndicators.filter(
          ind => ind.categoryIds.indexOf(parseInt(id, 10)) > -1
        )
      );
    });
    return filteredIndicators;
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getSelectedIndicator],
  (indicators, selectedIndicator) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = selectedIndicator || indicators[0];
    return mapIndicator;
  }
);

const countryStyles = {
  default: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const MAP_COLORS = [
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)'],
  ['rgb(55, 104, 141)', 'rgb(164, 164, 164)']
];

export const getPathsWithStyles = createSelector(
  [getMapIndicator],
  indicator => {
    if (!indicator) return [];
    const paths = [];
    worldPaths.forEach(path => {
      if (path.properties.layer !== PATH_LAYERS.ISLANDS) {
        const { locations, legendBuckets } = indicator;

        if (!locations) {
          paths.push({
            ...path,
            countryStyles
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const countryData = locations[iso];

        let style = countryStyles;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex);
          style = {
            ...countryStyles,
            default: {
              ...countryStyles.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...countryStyles.hover,
              fill: color,
              fillOpacity: 1
            }
          };
        }

        paths.push({
          ...path,
          style
        });
      }
      return null;
    });
    return paths;
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-content';
  return generateLinkToDataExplorer(search, section);
});

// Chart data methods

export const getLegend = createSelector(
  [getMapIndicator, getMaximumCountries],
  (indicator, maximumCountries) => {
    if (!indicator || !indicator.legendBuckets || !maximumCountries) {
      return null;
    }
    const bucketsWithId = Object.keys(indicator.legendBuckets).map(id => ({
      ...indicator.legendBuckets[id],
      id
    }));
    return bucketsWithId.map(label => {
      const partiesNumber = Object.values(indicator.locations).filter(
        l => l.label_id === parseInt(label.id, 10)
      ).length;
      return {
        ...label,
        value: (partiesNumber * 100) / maximumCountries,
        partiesNumber,
        color: getColorByIndex(indicator.legendBuckets, label.index)
      };
    });
  }
);

export const getEmissionsCardData = createSelector(
  [getLegend, getMapIndicator],
  (legend, indicator) => {
    // Get last year of emissions and values for each country
    // From each country in each legend label get emissions from last year in emissions data (2014?)
    // Sum the values for each label and calculate percentage over the full value
    if (!indicator || !legend) return null;
    const data = [
      {
        name: 'groupA',
        value: 400
      },
      {
        name: 'groupB',
        value: 300
      },
      {
        name: 'groupC',
        value: 300
      },
      {
        name: 'groupD',
        value: 200
      },
      {
        name: 'groupE',
        value: 278
      },
      {
        name: 'groupF',
        value: 189
      }
    ];

    const config = {
      tooltip: {
        groupA: {
          label: 'Group A'
        },
        groupB: {
          label: 'Group B'
        },
        groupC: {
          label: 'Group C'
        },
        groupD: {
          label: 'Group D'
        },
        groupE: {
          label: 'Group E'
        },
        groupF: {
          label: 'Group F'
        }
      },
      animation: true,
      axes: {
        yLeft: {
          unit: 'MtCO2e',
          label: '2010'
        }
      },
      theme: {
        // Color of the slices is in the stroke attribute:
        // fill: '#f5b335', // Optional -just if monochrome
        groupA: {
          label: 'Group A',
          stroke: 'red'
        },
        groupB: {
          label: 'Group B',
          stroke: 'blue'
        },
        groupC: {
          label: 'Group C',
          stroke: 'teal'
        },
        groupD: {
          label: 'Group D',
          stroke: 'orange'
        },
        groupE: {
          label: 'Group E',
          stroke: 'maroon'
        },
        groupF: {
          label: 'Group F',
          stroke: 'fuchsia'
        }
      },
      innerRadius: 50,
      outerRadius: 80,
      hideLabel: false,
      hideLegend: true
    };
    return {
      config,
      data
    };
  }
);
export const getSummaryCardData = createSelector(
  [getLegend, getMapIndicator, getMaximumCountries],
  (legend, indicator, maximumCountries) => {
    if (!indicator || !legend) return null;
    // TODO: This may change. The info will come from the backend
    const selectedLegendItem = legend[0];
    return {
      value: selectedLegendItem.partiesNumber,
      description: `out of ${maximumCountries} parties - ${indicator.label}`
    };
  }
);

export default {
  getMapIndicator,
  getIndicatorsParsed,
  getEmissionsCardData,
  getPathsWithStyles,
  getSummaryCardData
};
