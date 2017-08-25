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
        category: item.mainCategory
      })),
      'value'
    ),
    'category'
  )
);

export const getSelectedCategory = createSelector(
  [state => state.selectedCategory, getCategories],
  (selected, categories) => {
    if (selected) return selected;
    if (categories.length > 0) {
      return categories[0].value;
    }
    return '';
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.selectedIndicator, getIndicators, getSelectedCategory],
  (selected, indicators, category) => {
    if (selected) return selected;
    if (category && indicators[category] && indicators[category].length > 0) {
      return indicators[category][0].value;
    }
    return '';
  }
);

export default {
  getCategories,
  getIndicators
};
