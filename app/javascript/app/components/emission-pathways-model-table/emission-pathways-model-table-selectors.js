import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import { ESP_BLACKLIST } from 'data/constants';

const getCategoryName = state =>
  (state.category && state.category.toLowerCase()) || null;
const getModelId = state => state.modelId || null;
const getData = state =>
  (!isEmpty(state.espModelsData) ? state.espModelsData : null);

const getModelDataById = createSelector([getData, getModelId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getSelectedIds = createSelector(
  [getModelDataById, getCategoryName],
  (data, category) => {
    if (!data || !category) return null;
    return data[category].map(i => i.id) || null;
  }
);

const getSelectedData = createSelector(
  [
    state => state.espScenariosData,
    state => state.espIndicatorsData,
    getCategoryName
  ],
  (scenarios, indicators, category) => {
    if (!scenarios || !indicators) return null;
    return category === 'indicators' ? indicators : scenarios;
  }
);

const getFilteredData = createSelector(
  [getSelectedData, getSelectedIds, getCategoryName],
  (data, ids) => {
    if (!ids || isEmpty(data)) return null;
    return data.filter(i => ids.indexOf(i.id) > -1) || null;
  }
);

export const filterDataByBlackList = createSelector(
  [getFilteredData, getCategoryName],
  (data, category) => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data[0]),
      n => ESP_BLACKLIST[category].indexOf(n) === -1
    );
    return data.map(d => pick(d, whiteList));
  }
);

export const flattenedData = createSelector([filterDataByBlackList], data => {
  if (!data || isEmpty(data)) return null;
  const attributesWithObjects = ['model', 'category', 'subcategory'];
  return data.map(d => {
    const flattenedD = d;
    attributesWithObjects.forEach(a => {
      if (Object.prototype.hasOwnProperty.call(d, a)) {
        flattenedD[a] = d[a] && d[a].name;
      }
    });
    return flattenedD;
  });
});

export const defaultColumns = createSelector(getCategoryName, category => {
  const categoryDefaultColumns = {
    scenarios: ['name', 'category', 'description'],
    indicators: ['name', 'category', 'definition']
  };
  return categoryDefaultColumns[category];
});

export const titleLinks = createSelector(
  [getFilteredData, getCategoryName],
  (data, category) => {
    if (!data || isEmpty(data) || category === 'indicators') return null;
    return data.map(d => ({
      fieldName: 'name',
      url: `/emission-pathways/scenarios/${d.id}`
    }));
  }
);

export default {
  flattenedData,
  defaultColumns,
  titleLinks
};
