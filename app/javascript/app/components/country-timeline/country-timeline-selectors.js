import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getIso = state => state.iso || null;
const getTimeline = state => state.timeline || null;

export const getDates = createSelector(
  [getIso, getTimeline],
  (iso, timeline) => {
    const { data } = timeline;
    if (isEmpty(data) || !data[iso]) return null;
    return data[iso].map(d => d.date);
  }
);

export default {
  getDates
};
