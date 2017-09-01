import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';

const getData = state => state.data || [];

export const getCategories = createSelector(getData, data =>
  uniqBy(
    data.map(item => ({
      value: item.mainCategory,
      label: item.mainCategory
    })),
    'value'
  )
);

export const getIndicators = createSelector(getData, data =>
  groupBy(
    uniqBy(
      data.map(item => ({
        value: item.slug,
        label: item.title,
        category: item.mainCategory,
        countries: item.countries,
        legend: item.legend,
        legendBuckets: item.legendBuckets
      })),
      'value'
    ),
    'category'
  )
);

export const getSelectedCategory = createSelector(
  [state => state.category, getCategories],
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

export const getSelectedIndicator = createSelector(
  [state => state.indicator, getIndicators, getSelectedCategory],
  (selected, indicators = {}, category = {}) => {
    const categoryValue = category.value;
    if (
      categoryValue &&
      indicators[categoryValue] &&
      indicators[categoryValue].length > 0
    ) {
      const selectedIndicators = indicators[categoryValue];
      if (selected) {
        const filtered = selectedIndicators.filter(
          indicator => indicator.value === selected
        );
        return filtered.length > 0 ? filtered[0] : {};
      }
      return selectedIndicators[0];
    }
    return {};
  }
);

export const getCountriesGeometry = createSelector(
  state => state.data,
  countries => countries.map(country => country.topojson)
);

export default {
  getCategories,
  getIndicators,
  getSelectedCategory,
  getSelectedIndicator
};
