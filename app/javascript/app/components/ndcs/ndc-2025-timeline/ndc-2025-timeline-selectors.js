import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getTimeline = state => state.timeline || null;

export const getDates = createSelector([getTimeline], (timeline) => {
  const { data } = timeline;
  const documents = Object.entries(groupBy(data, 'date'))
    .map(([key, value]) => ({ date: key, countries: value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return documents;
});

export default {
  getDates
};
