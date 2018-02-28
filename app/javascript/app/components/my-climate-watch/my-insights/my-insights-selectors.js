import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getInsights = state => state.data || null;

export const parseInsights = createSelector(getInsights, data => {
  if (!data || isEmpty(data)) return [];
  return data.map(d => {
    if (!d.body) return {};
    const entities = d.body.entityMap;
    const firstEntityKey = Object.keys(entities).find(
      k => entities[k].type === 'multichart'
    );
    const firstEntity = entities[firstEntityKey];
    return {
      ...d,
      chart: firstEntity
    };
  });
});
