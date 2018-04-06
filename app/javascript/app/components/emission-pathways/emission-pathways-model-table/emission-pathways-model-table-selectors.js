import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import { ESP_BLACKLIST } from 'data/constants';
import { sanitizeUrl } from 'app/utils';

export const defaultColumns = ['name', 'category', 'description'];
export const ellipsisColumns = ['url'];
const getModelId = state => state.modelId || null;
const getData = state =>
  (!isEmpty(state.espModelsData) ? state.espModelsData : null);

const getModelDataById = createSelector([getData, getModelId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getSelectedIds = createSelector([getModelDataById], data => {
  if (!data) return null;
  return data.scenario_ids || null;
});

const getFilteredData = createSelector(
  [state => state.espScenariosData, getSelectedIds],
  (data, ids) => {
    if (!ids || isEmpty(data)) return null;
    const updatedData = data;
    return updatedData.filter(i => ids.indexOf(i.id) > -1) || null;
  }
);

const sanitizeUrls = createSelector([getFilteredData], data => {
  if (isEmpty(data)) return null;
  const parsedData = data;
  Object.keys(data).forEach(key => {
    if (key === 'url') parsedData.url = sanitizeUrl(data.url);
  });
  return parsedData;
});

export const filterDataByBlackList = createSelector([sanitizeUrls], data => {
  if (!data || isEmpty(data)) return null;
  const whiteList = remove(
    Object.keys(data[0]),
    n => ESP_BLACKLIST.scenarios.indexOf(n) === -1
  );
  const updatedData = data;
  return updatedData.map(d => pick(d, whiteList));
});

export const titleLinks = createSelector([getFilteredData], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => [
    {
      columnName: 'name',
      url: `/pathways/scenarios/${d.id}`
    },
    { columnName: 'url', url: 'self' }
  ]);
});

export default {
  filterDataByBlackList,
  defaultColumns,
  ellipsisColumns,
  titleLinks
};
