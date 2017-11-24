import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import uniq from 'lodash/uniq';
import { ESP_BLACKLIST, FILTERS_BY_CATEGORY } from 'data/constants';

const getCategory = state =>
  (state.category && state.category.toLowerCase()) || null;
const getData = state => state.categoryData || null;
const getQuery = state => deburrUpper(state.query) || '';
const getSearch = state => state.search || null;

export const getDefaultColumns = createSelector([getCategory], category => {
  switch (category) {
    case 'models':
      return [
        'full_name',
        'description',
        'license',
        'time_step',
        'time_horizon'
      ];
    case 'scenarios':
      return ['name', 'category', 'description'];
    case 'indicators':
      return ['name', 'category', 'unit'];
    default:
      return null;
  }
});

export const flattenedData = createSelector([getData], data => {
  if (!data || isEmpty(data)) return null;
  const attributesWithObjects = ['model', 'category', 'subcategory'];
  return data.map(d => {
    const flattenedD = d;
    attributesWithObjects.forEach(a => {
      if (Object.prototype.hasOwnProperty.call(d, a)) {
        flattenedD[a] = d[a] && d[a].name;
      }
    });
    return flattenedD;
  });
});

export const filteredDataBySearch = createSelector(
  [flattenedData, getQuery],
  (data, query) => {
    if (!data) return null;
    if (!query) return data;
    return data.filter(d =>
      Object.keys(d).some(key => {
        if (Object.prototype.hasOwnProperty.call(d, key) && d[key] !== null) {
          return deburrUpper(d[key]).indexOf(query) > -1;
        }
        return false;
      })
    );
  }
);

export const titleLinks = createSelector(
  [getCategory, getData],
  (categoryName, data) => {
    if (!data || isEmpty(data) || !categoryName) return null;
    const categoryId = {
      models: 'full_name',
      scenarios: 'name'
    };
    return data.map(d => ({
      fieldName: categoryId[categoryName],
      url: `${categoryName}/${d.id}`
    }));
  }
);

export const getFilterOptionsByCategory = createSelector(
  [getCategory, getData],
  (category, data) => {
    if (!category || !data || isEmpty(data)) return null;
    const filters = FILTERS_BY_CATEGORY[category];
    const categoryOptions = {};
    filters.forEach(f => {
      const sanitizedFilterData = [];
      data.forEach(d => {
        if (d[f] !== null && d[f] !== '' && d[f] !== undefined) {
          const filterName = typeof d[f] === 'string' ? d[f] : d[f].name;
          sanitizedFilterData.push(filterName);
        }
      });

      categoryOptions[f] = uniq(sanitizedFilterData).map(filterData => ({
        value: filterData,
        label: filterData
      }));
    });
    return categoryOptions;
  }
);

const getSelectedFields = createSelector([getSearch], search => {
  if (!search) return null;
  const selectedFields = search;
  delete selectedFields.search;
  return selectedFields;
});

export const getSelectedFieldOptions = createSelector(
  [getSelectedFields],
  fields => {
    if (!fields) return null;
    const fieldOptions = {};
    Object.keys(fields).forEach(key => {
      fieldOptions[key] = { value: fields[key], label: fields[key] };
    });
    return fieldOptions;
  }
);

export const filteredDataByFilters = createSelector(
  [flattenedData, getSelectedFields],
  (data, filters) => {
    if (!data) return null;
    if (!filters) return data;
    let filteredData = data;
    Object.keys(filters).forEach(key => {
      filteredData = filteredData.filter(
        d => d[key] === undefined || d[key] === filters[key]
      );
    });
    return filteredData;
  }
);

export const filterDataByBlackList = createSelector(
  [filteredDataByFilters, getCategory],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data[0]),
      n => ESP_BLACKLIST[category].indexOf(n) === -1
    );
    return data.map(d => pick(d, whiteList));
  }
);

export default {
  filterDataByBlackList,
  titleLinks,
  filteredDataByFilters,
  getFilterOptionsByCategory,
  getSelectedFieldOptions
};
