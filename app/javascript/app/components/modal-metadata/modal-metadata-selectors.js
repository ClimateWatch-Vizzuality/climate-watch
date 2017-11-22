import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getData = state => state.data || null;
const getActive = state => state.active || null;
const getTitle = state => state.customTitle || '';

export const getModalData = createSelector(
  [getData, getActive],
  (data, active) => {
    if (isEmpty(data) || !active) return null;
    if (active.every(d => data[d])) {
      return active.length > 1
        ? active.map(source => data[source])
        : [data[active]];
    }
    return null;
  }
);

export const getModalTitle = createSelector(
  [getTitle, getModalData],
  (customTitle, data) => {
    if (!data || isEmpty(data)) return null;
    return data.length > 1 ? customTitle : data[0].title;
  }
);

export const getTabTitles = createSelector(
  getModalData,
  data => (data && data.length > 1 ? data.map(d => d.title) : null)
);

export default {
  getModalTitle,
  getModalData,
  getTabTitles
};
