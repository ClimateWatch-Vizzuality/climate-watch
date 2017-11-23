import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import { ESP_BLACKLIST } from 'data/constants';

const getCategoryName = state =>
  (state.category && state.category.toLowerCase()) || null;
const getId = state => state.id || null;
const getData = state =>
  (!isEmpty(state.espModelsData) ? state.espModelsData : null);
const getIdData = createSelector([getData, getId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getIndicatorIds = createSelector(
  [getIdData, getCategoryName],
  (data, category) => {
    if (!data) return null;
    return data[category].map(i => i.id) || null;
  }
);

const getModelData = createSelector(
  [
    state => state.espIndicatorsData,
    state => state.espScenariosData,
    getIndicatorIds,
    getCategoryName
  ],
  (indicatorsData, scenariosData, ids, category) => {
    const data = category === 'indicators' ? indicatorsData : scenariosData;
    if (!ids || isEmpty(data) || isEmpty(ids)) return null;
    return data.filter(i => i.id) || null;
  }
);

export const filterDataByBlackList = createSelector(
  [getModelData, getCategoryName],
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

export const titleLinks = createSelector([getData], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => ({
    fieldName: 'name',
    url: `scenarios/${d.id}`
  }));
});

export default {
  flattenedData,
  defaultColumns,
  titleLinks
};
