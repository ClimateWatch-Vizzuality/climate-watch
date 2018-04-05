import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import { sanitize } from 'app/utils';
import { ESP_BLACKLIST } from 'data/constants';

const getId = state => state.id || null;
const getCategory = state => state.category || null;
const getCategoryData = state => state.categoryData || null;
const getModelsData = state => state.modelsData || null;

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

// Sanitize and extract needed fields

const addMantainerNameToScenario = createSelector(
  [getOverviewData, getModelsData, getCategory],
  (data, models, category) => {
    if (category !== 'Scenarios') return data;
    if (!data || isEmpty(data) || !models || !models.length) return null;
    const model = models.find(m => m.id === data.model.id);
    const maintainer = model && model.maintainer_name;
    return maintainer ? { ...data, maintainer } : data;
  }
);

const sanitizeData = createSelector([addMantainerNameToScenario], data => {
  if (isEmpty(data)) return null;
  const parsedData = {};
  Object.keys(data).forEach(key => {
    parsedData[key] = sanitize(data[key]);
  });
  return parsedData;
});

const addNotSpecToEmptyFields = createSelector([sanitizeData], data => {
  if (!data || isEmpty(data)) return null;
  const fieldsWithData = {};
  Object.keys(data).forEach(k => {
    if (data[k]) {
      fieldsWithData[k] = data[k];
    } else {
      fieldsWithData[k] = 'Not specified';
    }
  });
  return fieldsWithData;
});

export const filterDataByBlackList = createSelector(
  [addNotSpecToEmptyFields],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.models.concat('full_name').indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

// Select data

export const selectOverviewData = createSelector(
  [sanitizeData, getCategory],
  (data, category) => {
    const overviewFields = {
      Models: ['sectoral_coverage', 'time_horizon', 'license', 'url'],
      Scenarios: ['model', 'category', 'year', 'url'],
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
