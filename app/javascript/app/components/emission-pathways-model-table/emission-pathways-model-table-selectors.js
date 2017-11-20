import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getCategoryName = state => state.category || null;
const getId = state => state.id || null;
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
    return data[categoryName];
  }
);

export const defaultColumns = createSelector(getCategoryName, category => {
  const categoryDefaultColumns = {
    Scenarios: ['name', 'category', 'description'],
    Indicators: ['name', 'category', 'definition']
  };
  return categoryDefaultColumns[category];
});

export default {
  filteredCategoryData,
  defaultColumns
};
