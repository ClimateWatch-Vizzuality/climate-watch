import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

const getId = stateWithId => stateWithId.id || null;
const getCategory = stateWithId => stateWithId.category || null;
const getCategoryData = stateWithId => stateWithId.categoryData.data || null;

const getOverviewData = createSelector([getCategoryData, getId], (data, id) => {
  if (isEmpty(data)) return null;
  const idData = data.find(d => String(d.id) === id);
  if (!idData) return null;
  return idData;
});

const selectOverviewData = createSelector(
  [getOverviewData, getCategory],
  (data, category) => {
    const overviewFields = {
      Models: [
        'maintainer_name',
        'geographic_coverage_region',
        'sectoral_coverage',
        'time_horizon',
        'license'
      ],
      Scenarios: [],
      Indicators: []
    };
    return pick(data, overviewFields[category]);
  }
);

export const parseArraysOverviewData = createSelector(
  [selectOverviewData],
  data => {
    const parsedData = {};
    Object.keys(data).forEach(key => {
      let fieldData = data[key];
      if (fieldData && typeof fieldData !== 'string') {
        fieldData = fieldData.join(', ');
      }
      parsedData[key] = fieldData;
    });
    return parsedData;
  }
);

export default {
  parseArraysOverviewData
};
