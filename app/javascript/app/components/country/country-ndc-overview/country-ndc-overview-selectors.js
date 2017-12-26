import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getValues = state => (state ? state.values : null);

export const getValuesGrouped = createSelector(getValues, values => {
  if (!values || !values.length) return null;
  const groupedValues = groupBy(values, 'slug');
  Object.keys(groupedValues).forEach(key => {
    if (!groupedValues[key].length) groupedValues[key] = null;
  });
  return groupedValues;
});

export default {
  getValuesGrouped
};
