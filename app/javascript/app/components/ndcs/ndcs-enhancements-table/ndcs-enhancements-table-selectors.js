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

export const getCategory = createSelector(
  [getCategories],
  (categories = []) => {
    if (!categories || !categories.length) return null;
    return (
      categories.find(cat => cat.value === 'ndc_enhancement') || categories[0]
    );
  }
);

export const getCategoryIndicators = createSelector(
  [getindicatorsParsed, getCategory],
  (indicatorsParsed, category) => {
    const categoryIndicators = indicatorsParsed.filter(
      indicator => indicator.categoryIds.indexOf(parseInt(category.id, 10)) > -1
    );
    return sortBy(categoryIndicators, 'label');
  }
);

// export const getIndicator = createSelector(
//   [getCategoryIndicators],
//   (indicators = []) => {
//     if (!indicators || !indicators.length) return {};
//     return indicators[0];
//   }
// );

export const getSelectedData = createSelector(
  [getCategoryIndicators, getCountries],
  (indicators, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations)
      return [];

    return Object.keys(indicators[0].locations).map(iso => {
      const countryData =
        countries.find(country => country.iso_code3 === iso) || {};
      let row = {
        country: countryData.wri_standard_name || iso,
        iso
      };
      indicators.forEach(ind => {
        row[ind.label] = ind.locations[iso].value;
      });
      return row;
    });
  }
);

export const getFilteredData = createSelector(
  [getSelectedData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return data.filter(d => {
      let match = false;
      for (let col in d) {
        if (deburrUpper(d[col]).indexOf(query) > -1) {
          match = true;
          break;
        }
      }
      return match;
    });
  }
);

export const removeIsoFromData = createSelector([getFilteredData], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => {
    const iso = d.iso;
    delete d.iso;
    return {
      ...d,
      urlNotShow: `/ndcs/country/${iso}`
    };
  });
});

export default {
  getCategories,
  getCategoryIndicators,
  getCategory,
  //getIndicator,
  removeIsoFromData
};
