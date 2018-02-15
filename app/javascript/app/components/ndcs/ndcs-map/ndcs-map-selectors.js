import { createSelector } from 'reselect';
import { getColorByIndex } from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { PATH_LAYERS } from 'app/data/constants';

const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || {};
const getIndicatorsData = state => state.indicators || [];

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getCategories = createSelector(getCategoriesData, categories =>
  sortBy(
    Object.keys(categories).map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    })),
    'label'
  )
);

export const getIndicatorsParsed = createSelector(
  [getIndicatorsData, getISOCountries],
  (indicators, isos) =>
    sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets =
            Object.keys(i.locations) === isos
              ? i.labels
              : { ...i.labels, 0: { name: 'No data', index: 0 } };
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
    )
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

export const getCategoryIndicators = createSelector(
  [getIndicatorsParsed, getSelectedCategory],
  (indicatorsParsed, category) => {
    const categoryIndicators = indicatorsParsed.filter(
      indicator => indicator.categoryIds.indexOf(parseInt(category.id, 10)) > -1
    );
    return categoryIndicators;
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.indicatorSelected, getCategoryIndicators],
  (selected, indicators = []) => {
    if (!indicators || !indicators.length) return {};
    if (!selected) {
      return indicators.find(ind => ind.value === 'pa_status') || indicators[0];
    }
    return (
      indicators.find(indicator => indicator.value === selected) ||
      indicators[0]
    );
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

export const getPathsWithStyles = createSelector(
  [getSelectedIndicator],
  selectedIndicator => {
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
          const color = getColorByIndex(legendBuckets, legendData.index);
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

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getPathsWithStyles
};
