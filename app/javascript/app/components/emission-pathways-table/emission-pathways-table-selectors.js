import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { deburrUpper } from 'app/utils';

const getCategoryName = data => data.category || null;
const getCategoryData = espData =>
  (espData.categoryData && !isEmpty(espData.categoryData.data)
    ? espData.categoryData.data
    : null);

const getQuery = data => deburrUpper(data.query) || '';

const filteredCategoryData = createSelector(
  [getCategoryData, getCategoryName],
  (data, category) => {
    if (!data) return null;
    const categoryWhiteListedFields = {
      Models: [
        'full_name',
        'abbreviation',
        'availability',
        'current_version',
        'license'
      ],
      Scenarios: [
        'name',
        'category_abbreviation',
        'category',
        'geographic_coverage_country',
        'geographic_coverage_region'
      ],
      Indicators: ['name', 'category', 'subcategory', 'definition']
    };
    return data.map(d => pick(d, categoryWhiteListedFields[category]));
  }
);

export const filteredDataBySearch = createSelector(
  [filteredCategoryData, getQuery],
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
  [getCategoryName, getCategoryData],
  (categoryName, data) => {
    if (!data || !categoryName) return null;
    const categoryId = {
      Models: 'full_name',
      Scenarios: 'name',
      Indicators: 'name'
    };
    return data.map(d => ({
      fieldName: categoryId[categoryName],
      url: `${categoryName.toLowerCase()}/${d.id}`
    }));
  }
);

export const sortBy = createSelector([filteredDataBySearch], data => {
  if (!data || isEmpty(data)) return null;
  return Object.keys(data[0])[0];
});

export default {
  filteredDataBySearch,
  titleLinks,
  sortBy
};
