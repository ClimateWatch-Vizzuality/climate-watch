import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const getValues = state => (state && state.values) || null;
const getIso = state => (state && state.iso) || null;
const getDocuments = state => (state && state.documents) || null;

export const getValuesGrouped = createSelector(getValues, values => {
  if (!values || !values.length) return null;
  const groupedValues = groupBy(values, 'slug');
  Object.keys(groupedValues).forEach(key => {
    if (!groupedValues[key].length) groupedValues[key] = null;
  });
  return groupedValues;
});

export const getLastDocument = createSelector(
  [getDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso][documents[iso].length - 1];
  }
);

export default {
  getValuesGrouped
};
