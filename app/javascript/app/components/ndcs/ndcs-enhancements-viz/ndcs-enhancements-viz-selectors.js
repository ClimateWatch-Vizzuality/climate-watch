import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
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
    const categoryId = Object.keys(categories).find(
      id => categories[id].slug === 'ndc_enhancement'
    );
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
    ).filter(ind => ind.categoryIds.indexOf(parseInt(categoryId, 10)) > -1);
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators.find(
      ind => ind.value === 'ndce_status_2020'
    );

    if (mapIndicator) {
      const noInfoId = Object.keys(mapIndicator.legendBuckets).find(
        id => mapIndicator.legendBuckets[id].slug === 'no_info_2020'
      );
      // Set all countries without values to "No Information" by default
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
  [
    'rgb(255, 108, 47)',
    'rgb(30, 79, 116)',
    'rgb(132, 181, 218)',
    'rgb(0, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(255, 108, 47)',
    'rgb(30, 79, 116)',
    'rgb(132, 181, 218)',
    'rgb(0, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(255, 108, 47)',
    'rgb(30, 79, 116)',
    'rgb(132, 181, 218)',
    'rgb(0, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(255, 108, 47)',
    'rgb(30, 79, 116)',
    'rgb(132, 181, 218)',
    'rgb(0, 0, 0)',
    'rgb(204, 204, 204)'
  ],
  [
    'rgb(255, 108, 47)',
    'rgb(30, 79, 116)',
    'rgb(132, 181, 218)',
    'rgb(0, 0, 0)',
    'rgb(204, 204, 204)'
  ]
];

export const getPathsWithStyles = createSelector(
  [getMapIndicator, getISOCountries],
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
        const isEuropeanCountry = europeanCountries.includes(iso);
        const countryData = isEuropeanCountry
          ? locations[europeSlug]
          : locations[iso];

        let style = countryStyles;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = countryData.label_slug == 'ambg_2020' ? 'url(#pattern_gJ2H6)' : getColorByIndex(legendBuckets, legendIndex, MAP_COLORS);
          style = {
            ...countryStyles,
            default: {
              ...countryStyles.default,
              fill: color ,
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

    // Retain functionality for showing submitted 2020 NDCs in case this becomes useful to display later
    // Retain functionality for showing emissions percentage in case this becomes useful to display later
    // ONLY "intent to submit" and "intent to enhance" 2020 NDCs currently displayed in component
    // ONLY country totals currently displayed in component
    labels.forEach(label => {
      summaryData[label.slug] = {
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
              switch (label.slug) {
                case 'enhance_2020':
                  return '<strong>countries have stated their intention to <span title="Definition: Strengthening mitigation ambition and/or increasing adaptation action in the 2020 NDC.">enhance ambition or action</span> in an NDC by 2020</strong>';
                  break;
                case 'intend_2020':
                  return '<strong>countries have stated their intention to <span title="Definition: Includes providing information to improve the clarity of the NDC or on measures to implement the current NDC.">update</span> an NDC by 2020</strong>';
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
              'of global emissions are represented by these countries (2014 emissions data)'
          }
        }
      };
    });
    const emissionsIndicator = indicators.find(ind => ind.value === 'ndce_ghg');
    Object.keys(indicator.locations).forEach(l => {
      const location = indicator.locations[l];
      const type = location.label_slug;
      if (type) {
        summaryData[type].countries.value++;
        if (emissionsIndicator.locations[l]) {
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
      summaryData[type].countries.opts.label += `, representing <span title="2014 emissions data">${summaryData[
        type
      ].emissions.value}% of global emissions</span>`;
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
