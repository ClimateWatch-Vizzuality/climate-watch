import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';
import remove from 'lodash/remove';
import pick from 'lodash/pick';

const getCategory = state => state.category || null;
const getData = state => state.categoryData || null;
const getQuery = state => deburrUpper(state.query) || '';

export const getDefaultColumns = createSelector([getCategory], category => {
  switch (category) {
    case 'Models':
      return [
        'full_name',
        'abbreviation',
        'availability',
        'current_version',
        'development_year',
        'expertise',
        'license',
        'maintainer_name'
      ];
    case 'Scenarios':
      return [
        'name',
        'category_abbreviation',
        'category',
        'geographic_coverage_country',
        'geographic_coverage_region',
        'purpose_or_objective',
        'time_horizon'
      ];
    case 'Indicators':
      return ['name', 'category', 'subcategory', 'definition', 'unit'];
    default:
      return null;
  }
});

export const filterDataByBlackList = createSelector(
  [getData, getCategory],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    const blackList = {
      Models: ['scenarios', 'indicators'],
      Scenarios: ['indicators'],
      Indicators: []
    };
    const whiteList = remove(
      Object.keys(data[0]),
      n => blackList[category].indexOf(n) === -1
    );
    return data.map(d => pick(d, whiteList));
  }
);

export const filteredDataBySearch = createSelector(
  [filterDataByBlackList, getQuery],
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

export default {
  getDefaultColumns,
  filteredDataBySearch
};
