import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import { sortBy, flatten, lowerCase, uniqBy } from 'lodash';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { PATH_LAYERS } from 'app/data/constants';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;

const PERMITTED_AGRICULTURE_INDICATOR = ['m_agriculture', 'a_agriculture'];

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
    );
  }
);

export const getAgricultureIndicators = createSelector(
  [getIndicatorsParsed],
  indicatorsParsed => {
    if (!indicatorsParsed) return null;
    const agricultureIndicators = indicatorsParsed.filter(indicator =>
      PERMITTED_AGRICULTURE_INDICATOR.includes(indicator.value)
    );
    return agricultureIndicators;
  }
);

export const getCountriesCountWithProposedActions = createSelector(
  [getAgricultureIndicators, getIndicatorsParsed],
  (indicators, indicatorsParsed) => {
    if (!indicators || !indicatorsParsed) return 0;
    const KEY_WORD_FOR_NO_ACTION = 'no';
    const countriesCount = {};
    indicatorsParsed
      .filter(({ value }) => PERMITTED_AGRICULTURE_INDICATOR.includes(value))
      .forEach(indicator => {
        const isoCodes = Object.keys(indicator.locations);
        const actionCountries = isoCodes.filter(
          isoCode =>
            !lowerCase(indicator.locations[isoCode].value).startsWith(
              KEY_WORD_FOR_NO_ACTION
            )
        ).length;
        countriesCount[indicator.value] = actionCountries;
      });
    return countriesCount;
  }
);

export const getCategories = createSelector(
  [getCategoriesData, getAgricultureIndicators],
  (categories, indicators) => {
    if (!categories || !indicators) return null;

    const indicatorsCategoryIds = indicators.map(ind => ind.categoryIds);
    const uniqueIndicatorsCategoryIds = flatten([
      ...new Set(indicatorsCategoryIds)
    ]);

    return sortBy(
      Object.keys(categories)
        .filter(category =>
          uniqueIndicatorsCategoryIds.includes(parseInt(category, 10))
        )
        .map(category => ({
          label: categories[category].name,
          value: categories[category].slug,
          id: category
        })),
      'label'
    );
  }
);

export const getSelectedCategory = createSelector(
  [state => state.categorySelected, getCategories],
  (selected, categories = []) => {
    if (!categories || !categories.length) return null;
    const defaultCategory =
      categories.find(cat => cat.value === 'unfccc_process') || categories[0];
    if (selected) {
      return (
        categories.find(category => category.value === selected) ||
        defaultCategory
      );
    }
    return defaultCategory;
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
  ['#0677B3', '#1ECDB0'],
  ['#0677B3', '#1ECDB0', '#00A0CA'],
  ['#0677B3', '#1ECDB0', '#00A0CA', '#00B4D2']
];

export const getSelectedIndicator = createSelector(
  [getSelectedCategory, getAgricultureIndicators],
  (selectedCategory, agricultureIndicators) => {
    if (!selectedCategory || !agricultureIndicators) return null;

    return agricultureIndicators.find(ind =>
      ind.categoryIds.includes(parseInt(selectedCategory.id, 10))
    );
  }
);

export const getPathsWithStyles = createSelector(
  [getSelectedIndicator],
  selectedIndicator => {
    if (!selectedIndicator) return [];
    const paths = [];

    worldPaths.forEach(path => {
      if (path.properties.layer !== PATH_LAYERS.ISLANDS) {
        const { locations, legendBuckets } = selectedIndicator;

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
          const legendData = legendBuckets[countryData.label_id];
          const color = getColorByIndex(
            legendBuckets,
            legendData.index,
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
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-content';
  return generateLinkToDataExplorer(search, section);
});

export default {
  getCategories,
  getSelectedIndicator,
  getAgricultureIndicators,
  getSelectedCategory,
  getPathsWithStyles,
  getCountriesCountWithProposedActions
};
