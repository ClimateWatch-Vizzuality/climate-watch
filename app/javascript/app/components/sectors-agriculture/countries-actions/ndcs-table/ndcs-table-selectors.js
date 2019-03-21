import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import flatten from 'lodash/flatten';

const getCategoriesData = state => state.categories || {};
const getIndicatorsData = state => state.indicators || [];
const getCountries = state => state.countries || [];
const getQuery = state => deburrUpper(state.query) || '';

const PERMITTED_AGRICULTURE_INDICATOR = ['m_agriculture', 'a_agriculture'];

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

export const getAgricultureIndicators = createSelector(
  [getindicatorsParsed],
  indicatorsParsed => {
    if (!indicatorsParsed) return null;
    const agricultureIndicators = indicatorsParsed.filter(indicator =>
      PERMITTED_AGRICULTURE_INDICATOR.includes(indicator.value)
    );
    return agricultureIndicators;
  }
);

export const getCategories = createSelector(
  [getCategoriesData, getAgricultureIndicators],
  (categories, agricultureIndicators) => {
    if (!categories || !agricultureIndicators) return [];

    const indicatorsCategoryIds = agricultureIndicators.map(
      ind => ind.categoryIds
    );
    const uniqueIndicatorsCategoryIds = flatten([
      ...new Set(indicatorsCategoryIds)
    ]);

    return Object.keys(categories)
      .filter(category =>
        uniqueIndicatorsCategoryIds.includes(parseInt(category, 10))
      )
      .map(category => ({
        label: categories[category].name,
        value: categories[category].slug,
        id: category
      }));
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
  [getSelectedCategory, getAgricultureIndicators],
  (selectedCategory, agricultureIndicators) => {
    if (!selectedCategory || !agricultureIndicators) return null;

    return agricultureIndicators.find(ind =>
      ind.categoryIds.includes(parseInt(selectedCategory.id, 10))
    );
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
