import { createSelector } from 'reselect';
import {
  getColorByIndex,
  createLegendBuckets,
  shouldShowPath
} from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { COUNTRY_STYLES } from 'components/ndcs/shared/constants';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

const FEATURE_LTS_UPDATED_DATA =
  process.env.FEATURE_LTS_UPDATED_DATA === 'true';

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
        categories[id].slug === 'ndc_enhancement' ||
        categories[id].slug === 'summary_information'
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
    const mapIndicator = indicators.find(
      ind => ind.value === (FEATURE_LTS_UPDATED_DATA ? 'lts_submission' : 'lts')
    );
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
      if (shouldShowPath(path)) {
        const { locations, legendBuckets } = indicator;

        if (!locations) {
          paths.push({
            ...path,
            COUNTRY_STYLES
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const countryData = locations[iso];

        let style = COUNTRY_STYLES;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex, MAP_COLORS);
          style = {
            ...COUNTRY_STYLES,
            default: {
              ...COUNTRY_STYLES.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...COUNTRY_STYLES.hover,
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
                default:
                  return 'countries';
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
    const emissionsIndicator = indicators.find(ind => ind.value === 'lts_ghg');
    const europeanLocationIsos = Object.keys(indicator.locations).filter(iso =>
      europeanCountries.includes(iso)
    );
    Object.keys(indicator.locations).forEach(l => {
      const location = indicator.locations[l];
      const type =
        location.value === 'Long-term Strategy Submitted'
          ? 'submitted'
          : 'not_submitted'; // location.label_slug;
      if (type) {
        summaryData[type].countries.value += 1;
        if (emissionsIndicator && emissionsIndicator.locations[l]) {
          // To avoid double counting in EUU
          if (l === europeSlug) {
            const EUTotal = parseFloat(
              emissionsIndicator.locations[europeSlug].value
            );
            const europeanLocationsValue = europeanLocationIsos.reduce(
              (acc, i) =>
                acc + parseFloat(emissionsIndicator.locations[i].value),
              0
            );
            summaryData[type].emissions.value +=
              EUTotal - europeanLocationsValue;
          } else {
            summaryData[type].emissions.value += parseFloat(
              emissionsIndicator.locations[l].value
            );
          }
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
