import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getData = state => state.data || null;
const getActive = state => state.active || null;
export const getModalTitle = state => state.title || null;

export const getModalData = createSelector(
  [getData, getActive],
  (data, active) => {
    if (isEmpty(data) || !active) return null;
    if (active.every(d => data[d])) {
      return active.length > 1
        ? Object.keys(data).map(source => data[source])
        : [data[active]];
    }
    return null;
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
