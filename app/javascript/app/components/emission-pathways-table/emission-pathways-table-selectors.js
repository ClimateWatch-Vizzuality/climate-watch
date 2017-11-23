import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import { ESP_BLACKLIST } from 'data/constants';

const getCategory = state =>
  (state.category && state.category.toLowerCase()) || null;
const getData = state => state.categoryData || null;
const getQuery = state => deburrUpper(state.query) || '';

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

export const filterDataByBlackList = createSelector(
  [getData, getCategory],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data[0]),
      n => ESP_BLACKLIST[category].indexOf(n) === -1
    );
    return data.map(d => pick(d, whiteList));
  }
);

export const flattenedData = createSelector([filterDataByBlackList], data => {
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

export default {
  getDefaultColumns,
  titleLinks,
  filteredDataBySearch
};
