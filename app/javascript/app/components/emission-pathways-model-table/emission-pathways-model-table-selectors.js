import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

const getCategoryName = data => data.category;
const getId = data => data.id || null;
const getData = espData =>
  (espData.espModelsData && !isEmpty(espData.espModelsData.data)
    ? espData.espModelsData.data
    : null);
const getIdData = createSelector([getData, getId], (data, id) => {
  if (!data || !id) return null;
  const idData = data.find(d => String(d.id) === id);
  return idData || null;
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
