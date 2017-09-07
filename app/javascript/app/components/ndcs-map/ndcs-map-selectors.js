import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';

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

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator
};
