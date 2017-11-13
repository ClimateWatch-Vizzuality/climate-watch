import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { deburrUpper } from 'app/utils';

const getModel = data => data.category || null;
const getModelData = espData =>
  (espData.categoryData && !isEmpty(espData.categoryData.data)
    ? espData.categoryData.data
    : null);

const getQuery = data => deburrUpper(data.query) || '';

export const filteredModelData = createSelector(
  [getModelData, getModel],
  (data, category) => {
    if (!data) return null;
    const categoryWhiteListedFields = {
      Models: [
        'full_name',
        'abbreviation',
        'availability',
        'current_version',
        'development_year',
        'expertise',
        'license',
        'maintainer_name'
      ],
      Scenarios: [
        'name',
        'category_abbreviation',
        'category',
        'geographic_coverage_country',
        'geographic_coverage_region',
        'purpose_or_objective',
        'time_horizon'
      ],
      Indicators: ['name', 'category', 'subcategory', 'definition', 'unit']
    };
    return data.map(d => pick(d, categoryWhiteListedFields[category]));
  }
);

export const filteredDataBySearch = createSelector(
  [filteredModelData, getQuery],
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

export const sortBy = createSelector([filteredDataBySearch], data => {
  if (!data || isEmpty(data)) return null;
  return Object.keys(data[0])[0];
});

export default {
  filteredDataBySearch,
  sortBy
};
