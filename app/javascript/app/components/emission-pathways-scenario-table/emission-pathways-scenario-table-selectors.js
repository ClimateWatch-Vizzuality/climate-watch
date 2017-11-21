import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';

const getId = state => state.id || null;
const getQuery = state => deburrUpper(state.query) || '';
const getData = state =>
  (!isEmpty(state.espScenariosData) ? state.espScenariosData : null);

const getIdData = createSelector([getData, getId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getIndicatorsData = createSelector(getIdData, data => {
  if (!data) return null;
  return data.indicators || null;
});

export const filteredDataBySearch = createSelector(
  [getIndicatorsData, getQuery],
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

export const defaultColumns = () => [
  'alias',
  'category',
  'subcategory',
  'trend'
];

export default {
  filteredDataBySearch,
  defaultColumns
};
