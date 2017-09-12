import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import worldPaths from 'app/data/world-50m-paths';

const getCategoriesData = state => state.categories || {};
const getIndicatorsData = state => state.indicators || [];

export const getCategories = createSelector(getCategoriesData, categories =>
  Object.keys(categories).map(category => ({
    label: categories[category].name,
    value: categories[category].slug,
    id: category
  }))
);

export const getIndicatorsGrouped = createSelector(
  getIndicatorsData,
  indicators =>
    groupBy(
      uniqBy(
        indicators.map(item => ({
          label: item.name,
          value: item.slug,
          categoryId: item.category_id,
          locations: item.locations,
          legendBuckets: item.labels
        })),
        'value'
      ),
      'categoryId'
    )
);

export const getSelectedCategory = createSelector(
  [state => state.categorySelected, getCategories],
  (selected, categories = []) => {
    if (categories.length > 0) {
      if (selected) {
        const filtered = categories.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : {};
      }
      return categories[0];
    }
    return {};
  }
);

export const getCategoryIndicators = createSelector(
  [getIndicatorsGrouped, getSelectedCategory],
  (indicatorsGrouped = {}, category = {}) => {
    const categoryId = category.id;
    return categoryId && indicatorsGrouped[categoryId]
      ? indicatorsGrouped[categoryId]
      : [];
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.indicatorSelected, getCategoryIndicators],
  (selected, indicators = []) => {
    if (indicators.length > 0) {
      if (selected) {
        const filtered = indicators.filter(
          indicator => indicator.value === selected
        );
        return filtered.length > 0 ? filtered[0] : {};
      }
      return indicators[0];
    }
    return {};
  }
);

const countryStyles = {
  default: {
    fill: '#ECEFF1',
    fillOpacity: 0.3,
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#ECEFF1',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#ECEFF1',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const getPathsWithStyles = createSelector(
  [getSelectedIndicator],
  selectedIndicator =>
    worldPaths.map(path => {
      const { locations, legendBuckets } = selectedIndicator;
      const countryData = locations && locations[path.id];

      if (countryData) {
        const legendData = legendBuckets[countryData.label_id];
        const color = legendData && legendData.color;
        const style = {
          ...countryStyles,
          default: {
            ...countryStyles.default,
            fill: color,
            fillOpacity: 0.9
          },
          hover: {
            ...countryStyles.hover,
            fill: color,
            fillOpacity: 1
          }
        };
        return {
          ...path,
          style
        };
      }
      return {
        ...path,
        style: countryStyles
      };
    })
);

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getPathsWithStyles
};
