import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

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
    sortBy(
      uniqBy(
        indicators.map(item => ({
          label: item.name,
          value: item.slug,
          categoryIds: item.category_ids,
          locations: item.locations,
          legendBuckets: item.labels
        })),
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
  [getindicatorsParsed, getSelectedCategory],
  (indicatorsParsed, category) => {
    const categoryIndicators = indicatorsParsed.filter(
      indicator => indicator.categoryIds.indexOf(parseInt(category.id, 10)) > -1
    );
    return sortBy(categoryIndicators, 'label');
  }
);

export const getSelectedIndicator = createSelector(
  [state => state.indicatorSelected, getCategoryIndicators],
  (selected, indicators = []) => {
    if (!indicators || !indicators.length) return {};
    const defaultSelection = indicators[0];
    return selected
      ? indicators.find(indicator => indicator.value === selected) ||
        defaultSelection
      : defaultSelection;
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
        iso,
        value: selectedIndicator.locations[iso].value
      };
    });
  }
);

export const getFilteredData = createSelector(
  [getSelectedData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return data.filter(
      d =>
        deburrUpper(d.country).indexOf(query) > -1 ||
        deburrUpper(d.value).indexOf(query) > -1
    );
  }
);

export const removeIsoFromData = createSelector([getFilteredData], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => ({
    country: d.country,
    value: d.value,
    urlNotShow: `/ndcs/country/${d.iso}`
  }));
});

export default {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  removeIsoFromData
};
