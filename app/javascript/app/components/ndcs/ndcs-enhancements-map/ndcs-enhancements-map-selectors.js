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
  [getIndicatorsParsed,getISOCountries],
  (indicators = [],isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators
      .find(ind => ind.value == "ndce_status_2020");

    //Set all countries without values to "No Information" by default
    console.log(mapIndicator);
    isos.forEach(iso => {
      if (!mapIndicator.locations[iso]) {
        mapIndicator.locations[iso] = {
          value:mapIndicator.legendBuckets[237].name,
          label_id:237
        }
      }
    })
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
    'rgb(172, 187, 191)'
  ],
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(172, 187, 191)'
  ],
  [
    'rgb(254, 224, 141)',
    'rgb(80, 129, 166)',
    'rgb(172, 187, 191)'
  ]

];

export const getPathsWithStyles = createSelector(
  [getMapIndicator,getISOCountries],
  (indicator,isos) => {
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
          const color = getColorByIndex(
            legendBuckets,
            legendIndex,
            MAP_COLORS
          );
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
});

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-enhancements';
  return generateLinkToDataExplorer(search, section);
});

//Chart data methods

export const summarizeIndicators = createSelector(
  [getIndicatorsParsed,getMapIndicator],
  (indicators,indicator) => {
    if (!indicator || !indicators) return null;
    let summaryData = {};
    //Retain functionality for showing submitted 2020 NDCs in case this becomes useful to display later
    //ONLY planned 2020 NDCs currently displayed in component
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
            label:
              'countries have stated their intention to submit a 2020 NDC'
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
            label: 'of global emissions are represented by these countries'
          }
        }
      };
    });
    const emissionsIndicator = indicators.find(
      indicator => indicator.value == 'ndce_ghg'
    );
    for (let l in indicator.locations) {
      const location = indicator.locations[l];
      var type =
        location.label_id == 235
          ? 'submitted'
          : location.label_id == 236 ? 'planned' : null;
      if (type) {
        summaryData[type].countries.value++;
        if (emissionsIndicator.locations[l])
          summaryData[type].emissions.value += parseFloat(
            emissionsIndicator.locations[l].value
          );
      }
    }
    return summaryData;
  }
);

//Table data methods

export const tableGetSelectedData = createSelector(
  [getIndicatorsParsed, getMapIndicator, getCountries],
  (indicators, indicator, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations)
      return [];

    return Object.keys(indicator.locations).map(iso => {
      if (indicator.locations[iso].label_id !== 237) {
        const countryData =
          countries.find(country => country.iso_code3 === iso) || {};
        let row = {
          country: countryData.wri_standard_name || iso,
          iso
        };
        indicators.forEach(ind => {
          if (ind.locations[iso]) {
            row[ind.label] = ind.locations[iso].value;
          }
        });
        return row;
      }
      return false;
    });
  }
);

export const tableGetFilteredData = createSelector(
  [tableGetSelectedData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return data.filter(d => {
      let match = false;
      for (let col in d) {
        if (deburrUpper(d[col]).indexOf(query) > -1) {
          match = true;
          break;
        }
      }
      return match;
    });
  }
);

export const tableRemoveIsoFromData = createSelector(
  [tableGetFilteredData],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const iso = d.iso;
      delete d.iso;
      return {
        ...d,
        urlNotShow: `/ndcs/country/${iso}`
      };
    });
  }
);

export default {
  getMapIndicator,
  tableRemoveIsoFromData,
  summarizeIndicators,
  getPathsWithStyles
};
