import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import { sanitize } from 'app/utils';
import { ESP_BLACKLIST } from 'data/constants';

const getId = stateWithId => stateWithId.id || null;
const getCategory = stateWithId => stateWithId.category || null;
const getCategoryData = stateWithId => stateWithId.categoryData || null;

const getOverviewData = createSelector([getCategoryData, getId], (data, id) => {
  if (isEmpty(data)) return null;
  const idData = data.find(d => String(d.id) === id);
  if (!idData) return null;
  return idData;
});

export const getModalTitle = createSelector([getOverviewData], data => {
  if (isEmpty(data)) return null;
  return data.full_name || 'Overview';
});

const parseArraysOverviewData = createSelector([getOverviewData], data => {
  if (isEmpty(data)) return null;
  const parsedData = {};
  Object.keys(data).forEach(key => {
    parsedData[key] = sanitize(data[key]);
  });
  return parsedData;
});

const removeEmptyFieldsfromData = createSelector(
  [parseArraysOverviewData],
  data => {
    if (!data || isEmpty(data)) return null;
    const fieldsWithData = {};
    Object.keys(data).forEach(k => {
      if (data[k]) fieldsWithData[k] = data[k];
    });
    return fieldsWithData;
  }
);

export const filterDataByBlackList = createSelector(
  [removeEmptyFieldsfromData],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.models.concat('full_name').indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

export const selectOverviewData = createSelector(
  [parseArraysOverviewData, getCategory],
  (data, category) => {
    const overviewFields = {
      Models: [
        'maintainer_name',
        'geographic_coverage_region',
        'sectoral_coverage',
        'time_horizon',
        'license'
      ],
      Scenarios: [
        'model',
        'mantainer_name',
        'sectoral_coverage',
        'time_horizon'
      ],
      Indicators: []
    };
    return pick(data, overviewFields[category]);
  }
);

export default {
  selectOverviewData,
  filterDataByBlackList,
  getModalTitle
};
