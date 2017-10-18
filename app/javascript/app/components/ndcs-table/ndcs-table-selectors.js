import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';

const getCategoriesData = state => state.categories || {};
const getIndicatorsData = state => state.indicators || [];
const getCountries = state => state.countries || [];
const getQuery = state => deburrUpper(state.query) || '';

export const getCategories = createSelector(getCategoriesData, categories =>
  Object.keys(categories).map(category => ({
    label: categories[category].name,
    value: categories[category].slug,
    id: category
  }))
);

export const getindicatorsParsed = createSelector(
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
  [state => state.categorySelected, getCategories, getIndicatorsData],
  (selected, categories = [], indicators) => {
    if (categories.length > 0) {
      if (selected) {
        const filtered = categories.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : {};
      }
      const firstCategorywithIndicators = categories.find(category =>
        indicators.some(
          indicator => indicator.category_ids.indexOf(category.id) > -1
        )
      );
      return firstCategorywithIndicators || categories[0];
    }
    return {};
  }
);

export const getCategoryIndicators = createSelector(
  [getindicatorsParsed, getSelectedCategory],
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

export const getSelectedData = createSelector(
  [getSelectedIndicator, getCountries],
  (selectedIndicator, countries) => {
    if (!selectedIndicator || !selectedIndicator.locations) return [];
    return Object.keys(selectedIndicator.locations).map(iso => {
      const countryData =
        countries.find(country => country.iso_code3 === iso) || {};
      return {
        country: countryData.wri_standard_name || iso,
        value: selectedIndicator.locations[iso].value
      };
    });
  }
);

export const getFilteredData = createSelector(
  [getSelectedData, getQuery],
  (data, query) =>
    data.filter(
      d =>
        deburrUpper(d.country).indexOf(query) > -1 ||
        deburrUpper(d.value).indexOf(query) > -1
    )
);

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getFilteredData
};
