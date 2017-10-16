import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const getData = state => state.data || null;
export const getActive = state => state.active || null;

export const getModalData = createSelector(
  [getData, getActive],
  (data, active) => {
    if (isEmpty(data) || !active) return null;
    if (data[active]) return data[active];
    return null;
  }
);

export const getModalTitle = createSelector(
  getModalData,
  data => (data ? data.title : '')
);

export default {
  getModalTitle,
  getModalData
};
