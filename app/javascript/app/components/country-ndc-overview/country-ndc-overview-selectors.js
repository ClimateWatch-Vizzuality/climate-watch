import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getValues = state => (state ? state.values : null);

export const getValuesGrouped = createSelector(getValues, values => {
  if (!values || !values.length) return null;
  return groupBy(values, 'slug');
});

export default {
  getValuesGrouped
};
