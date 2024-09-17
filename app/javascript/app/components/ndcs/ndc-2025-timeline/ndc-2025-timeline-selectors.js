import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

// TODO: Remove this mockup
import timelineMockup from './timeline.json';

const getTimeline = state => state.timeline || null;

export const getDates = createSelector([getTimeline], () => {
  const { data } = timelineMockup;
  const documents = Object.entries(groupBy(data, 'date'))
    .map(([key, value]) => ({ date: key, countries: value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return documents;
});

export default {
  getDates
};
