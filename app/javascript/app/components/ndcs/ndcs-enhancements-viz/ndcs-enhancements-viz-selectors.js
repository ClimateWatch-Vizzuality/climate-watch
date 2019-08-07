import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { PATH_LAYERS } from 'app/data/constants';
import isEmpty from 'lodash/isEmpty';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getIndicatorsData = state => state.indicators || null;
const getQuery = state => deburrUpper(state.query) || '';

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getIndicatorsData, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    return sortBy(
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
    ).filter(ind => ind.categoryIds.indexOf(11) > -1);
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getISOCountries],
  (indicators = [], isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators.find(
      ind => ind.value == 'ndce_status_2020'
    );

    // Set all countries without values to "No Information" by default
    isos.forEach(iso => {
      if (!mapIndicator.locations[iso]) {
        mapIndicator.locations[iso] = {
          value: mapIndicator.legendBuckets[238].name,
          label_id: 238
        };
      }
    });
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
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(255, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(255, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(255, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(255, 0, 0)',
    'rgb(204, 204, 204)'
  ]
];

export const getPathsWithStyles = createSelector(
  [getMapIndicator, getISOCountries],
  (indicator, isos) => {
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
        const isEuropeanCountry = europeanCountries.includes(iso);
        const countryData = isEuropeanCountry
          ? locations[europeSlug]
          : locations[iso];

        let style = countryStyles;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex, MAP_COLORS);
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

export const summarizeIndicators = createSelector(
  [getIndicatorsParsed, getMapIndicator],
  (indicators, indicator) => {
    if (!indicator || !indicators) return null;
    const summaryData = {};
    // Retain functionality for showing submitted 2020 NDCs in case this becomes useful to display later
    // ONLY planned 2020 NDCs currently displayed in component
    ['planned', 'submitted'].forEach(type => {
      summaryData[type] = {
        countries: {
          value: 0,
          max: Object.keys(indicator.locations).length,
          opts: {
            color: getColorByIndex(
              indicator.legendBuckets,
              type == 'submitted' ? '1' : '2',
              MAP_COLORS
            ),
            label: 'countries have stated their intention to submit a 2020 NDC'
          }
        },
        emissions: {
          value: 0,
          max: 100,
          opts: {
            color: getColorByIndex(
              indicator.legendBuckets,
              type == 'submitted' ? '1' : '2',
              MAP_COLORS
            ),
            suffix: '%',
            label:
              'of global emissions are represented by these countries (2015 emissions data)'
          }
        }
      };
    });
    const emissionsIndicator = indicators.find(
      indicator => indicator.value == 'ndce_ghg'
    );
    for (const l in indicator.locations) {
      const location = indicator.locations[l];
      const type =
        location.label_id == 235
          ? 'submitted'
          : location.label_id == 236 ? 'planned' : null;
      if (type) {
        summaryData[type].countries.value++;
        if (emissionsIndicator.locations[l]) {
          summaryData[type].emissions.value += parseFloat(
            emissionsIndicator.locations[l].value
          );
        }
      }
    }
    for (let type in summaryData) {
      parseFloat(
        (summaryData[type].emissions.value = summaryData[
          type
        ].emissions.value.toFixed(1))
      );
    }
    return summaryData;
  }
);

export default {
  getMapIndicator,
  summarizeIndicators,
  getPathsWithStyles
};
