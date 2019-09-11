import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { PATH_LAYERS } from 'app/data/constants';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryIds = Object.keys(categories).filter(
      // Need to get the NDC Enhancement data category to borrow the emissions figure from that dataset for consistency
      id =>
        categories[id].slug === 'longterm_strategy' ||
        categories[id].slug === 'ndc_enhancement'
    );
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
  [getIndicatorsParsed, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators.find(ind => ind.value === 'lts');

    if (mapIndicator) {
      const noInfoId = Object.keys(mapIndicator.legendBuckets).find(
        id => mapIndicator.legendBuckets[id].label === 'No Document Submitted'
      );
      // Set all countries without values to "No Document Submitted" by default
      if (noInfoId) {
        isos.forEach(iso => {
          if (!mapIndicator.locations[iso]) {
            mapIndicator.locations[iso] = {
              value: mapIndicator.legendBuckets[noInfoId].name,
              label_id: noInfoId,
              label_slug: mapIndicator.legendBuckets[noInfoId].slug
            };
          }
        });
      }
    }

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
    const labels = Object.keys(indicator.legendBuckets).map(id => ({
      ...indicator.legendBuckets[id],
      id
    }));

    labels.forEach(label => {
      const slug =
        label.name === 'Long-term Strategy Submitted'
          ? 'submitted'
          : 'not_submitted';

      summaryData[slug] = {
        countries: {
          value: 0,
          max: Object.keys(indicator.locations).length,
          opts: {
            color: getColorByIndex(
              indicator.legendBuckets,
              label.index,
              MAP_COLORS
            ),
            label: (() => {
              switch (slug) {
                case 'submitted':
                  return 'countries have submitted a long-term strategy document';
                  break;
                default:
                  return 'countries';
                  break;
              }
            })()
          }
        },
        emissions: {
          value: 0,
          max: 100,
          opts: {
            color: getColorByIndex(
              indicator.legendBuckets,
              label.index,
              MAP_COLORS
            ),
            suffix: '%',
            label:
              'of global emissions represented by these countries (2014 emissions data)'
          }
        }
      };
    });
    const emissionsIndicator = indicators.find(ind => ind.value === 'ndce_ghg');
    Object.keys(indicator.locations).forEach(l => {
      const location = indicator.locations[l];
      const type =
        location.value === 'Long-term Strategy Submitted'
          ? 'submitted'
          : 'not_submitted'; // location.label_slug;
      if (type) {
        summaryData[type].countries.value++;
        if (emissionsIndicator && emissionsIndicator.locations[l]) {
          summaryData[type].emissions.value += parseFloat(
            emissionsIndicator.locations[l].value
          );
        }
      }
    });
    Object.keys(summaryData).forEach(type => {
      summaryData[type].emissions.value = parseFloat(
        summaryData[type].emissions.value.toFixed(1)
      );
    });
    return summaryData;
  }
);

export default {
  getMapIndicator,
  getIndicatorsParsed,
  summarizeIndicators,
  getPathsWithStyles
};
