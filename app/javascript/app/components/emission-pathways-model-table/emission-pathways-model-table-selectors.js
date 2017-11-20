import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

const getCategoryName = data => data.category;
const getId = data => data.id || null;
const getData = state =>
  (!isEmpty(state.espModelsData) ? state.espModelsData : null);
const getIdData = createSelector([getData, getId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

export const filteredCategoryData = createSelector(
  [getIdData, getCategoryName],
  (data, category) => {
    if (!data) return null;
    const categoryName = category.toLowerCase();
    const categoryWhiteListedFields = {
      Scenarios: ['name', 'category', 'description'],
      Indicators: ['name', 'category', 'definition']
    };
    return data[categoryName].map(d =>
      pick(d, categoryWhiteListedFields[category])
    );
  }
);

export default {
  filteredCategoryData
};
