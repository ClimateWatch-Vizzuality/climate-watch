import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import placeholder from 'assets/insight-placeholder.jpg';

const getInsights = state => state.data || null;

export const parseInsights = createSelector(getInsights, data => {
  if (!data || isEmpty(data)) return [];
  return data.map(d => ({
    ...d,
    img: placeholder, // dummy data
    content: 'DRAFT READONLY HERE'
  }));
});
