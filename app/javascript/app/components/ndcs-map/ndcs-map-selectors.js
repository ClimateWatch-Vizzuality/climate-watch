import { createSelector } from 'reselect';
import { getColorByIndex } from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

const getCategoriesData = state => state.categories || {};
const getIndicatorsData = state => state.indicators || [];

export const getCategories = createSelector(getCategoriesData, categories =>
  Object.keys(categories).map(category => ({
    label: categories[category].name,
    value: categories[category].slug,
    id: category
  }))
);

export const getIndicatorsParsed = createSelector(
  getIndicatorsData,
  indicators =>
    uniqBy(
      indicators.map(item => ({
        label: item.name,
        value: item.slug,
        categoryIds: item.category_ids,
        locations: item.locations,
        legendBuckets: item.labels
      })),
      'value'
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
  [getIndicatorsParsed, getSelectedCategory],
  (indicatorsParsed, category) => {
    const categoryId = category.id;
    const categoryIndicators = indicatorsParsed.filter(
      indicator => indicator.categoryIds.indexOf(categoryId) > -1
    );
    return categoryIndicators;
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
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#ECEFF1',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#ECEFF1',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const getPathsWithStyles = createSelector(
  [getSelectedIndicator],
  selectedIndicator =>
    worldPaths.map(path => {
      const { locations, legendBuckets } = selectedIndicator;
      const defaultStyles = { ...path, style: countryStyles };

      if (!locations) return defaultStyles;
      const isEuropeanCountry = europeanCountries.includes(path.id);
      const countryData = isEuropeanCountry
        ? locations[europeSlug]
        : locations[path.id];

      if (countryData) {
        const legendData = legendBuckets[countryData.label_id];
        const color = getColorByIndex(legendBuckets, legendData.index);
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
      return defaultStyles;
    })
);

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getPathsWithStyles
};
