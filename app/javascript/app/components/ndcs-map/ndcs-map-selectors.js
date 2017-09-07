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

export const getAllIndicators = createSelector(getData, data =>
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

export const getCategoryIndicators = createSelector(
  [getAllIndicators, getSelectedCategory],
  (allIndicators = {}, category = {}) => {
    const categoryValue = category.value;
    return categoryValue && allIndicators[categoryValue]
      ? allIndicators[categoryValue]
      : [];
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.indicator, getCategoryIndicators],
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

export default {
  getCategories,
  getAllIndicators,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator
};
