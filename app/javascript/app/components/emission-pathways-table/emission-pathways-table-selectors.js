import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';

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

export const filteredDataBySearch = createSelector(
  [getData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
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
