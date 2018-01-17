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
        'developed_by',
        'geographic_coverage',
        'time_horizon'
      ];
    case 'scenarios':
      return ['model', 'name', 'geographic_coverage_country'];
    case 'indicators':
      return ['name', 'category', 'unit'];
    default:
      return null;
  }
});

export const getFullTextColumns = createSelector([getCategory], category => {
  switch (category) {
    case 'models':
      return ['full_name', 'geographic_coverage'];
    case 'scenarios':
      return ['geographic_coverage_country'];
    case 'indicators':
      return [];
    default:
      return null;
  }
});

export const flattenedData = createSelector(
  [getData, getCategory],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    const attributesWithObjects = {
      models: [],
      scenarios: ['model'],
      indicators: ['model', 'category', 'subcategory']
    };
    const updatedData = data;
    return updatedData.map(d => {
      const flattenedD = d;
      attributesWithObjects[category].forEach(a => {
        if (Object.prototype.hasOwnProperty.call(d, a)) {
          flattenedD[a] = d[a] && (d[a].name || d[a].full_name);
        }
      });
      return flattenedD;
    });
  }
);

export const filteredDataBySearch = createSelector(
  [flattenedData, getQuery],
  (data, query) => {
    if (!data) return null;
    if (!query) return data;
    const updatedData = data;
    return updatedData.filter(d =>
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
    const updatedData = data;
    return updatedData.map(d => ({
      fieldName: categoryId[categoryName],
      url: `${categoryName}/${d.id}`
    }));
  }
);

const getSelectedFields = createSelector(
  [getSearch, getCategory],
  (search, category) => {
    if (!search) return null;
    let selectedFields = search;
    const selectedKeys = Object.keys(selectedFields).filter(k =>
      k.startsWith(category)
    );
    selectedFields = pick(selectedFields, selectedKeys);

    const fieldsWithoutPrefix = {};
    Object.keys(selectedFields).forEach(k => {
      const keyWithoutPrefix = k.replace(`${category}-`, '');
      fieldsWithoutPrefix[keyWithoutPrefix] = selectedFields[k];
    });
    return fieldsWithoutPrefix;
  }
);

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
  [filteredDataBySearch, getSelectedFields],
  (data, filters) => {
    if (!data) return null;
    if (!filters) return data;
    let filteredData = data;
    const availableSubcategories = [];
    Object.keys(filters).forEach(key => {
      filteredData = filteredData.filter(d => {
        if (key === 'category' && d[key] === filters[key]) {
          availableSubcategories.push(d.subcategory);
        }
        return d[key] === undefined || d[key] === filters[key];
      });
    });
    return filteredData;
  }
);

export const getAvailableSubcategories = createSelector(
  [filteredDataBySearch, getSelectedFields],
  (data, filters) => {
    if (!data) return null;
    if (!filters || !filters.category) return [];
    const availableSubcategories = [];
    data.forEach(d => {
      if (d.category === filters.category) {
        availableSubcategories.push(d.subcategory);
      }
    });
    return uniq(availableSubcategories);
  }
);

export const getFilterOptionsByCategory = createSelector(
  [getCategory, getData, getAvailableSubcategories],
  (category, data, subcategories) => {
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
      let availableData = uniq(sanitizedFilterData);
      if (f === 'subcategory') {
        availableData = uniq(sanitizedFilterData).filter(
          d => subcategories.indexOf(d) > -1
        );
      }
      categoryOptions[f] = availableData.map(filterData => ({
        value: filterData,
        label: filterData
      }));
    });
    return categoryOptions;
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

export const renameDataColumns = createSelector(
  [filteredDataByFilters, getCategory],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    if (category === 'models') {
      let renamedData = data;
      const changes = [{ old: 'maintainer_name', new: 'developed_by' }];
      renamedData = renamedData.map(d => {
        const updatedD = d;
        changes.forEach(change => {
          if (d[change.old]) {
            updatedD[change.new] = d[change.old];
            delete updatedD[change.new];
          }
        });
        return updatedD;
      });
      return renamedData;
    }
    return data;
  }
);

export default {
  renameDataColumns,
  titleLinks,
  filteredDataByFilters,
  getFilterOptionsByCategory,
  getSelectedFieldOptions
};
