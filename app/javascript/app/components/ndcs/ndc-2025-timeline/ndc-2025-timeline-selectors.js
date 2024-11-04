import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getTimeline = state => state.countryTimeline2025 || null;

export const getTimelineDates = createSelector([getTimeline], timeline => {
  if (!timeline) return null;
  const { data } = timeline;
  if (!data) return null;
  const d = Object.values(data);
  const documents = Object.entries(groupBy(d, 'date'))
    .map(([key, value]) => ({ date: key, countries: value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return documents;
});

export default {
  getTimelineDates
};
