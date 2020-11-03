import { createSelector } from 'reselect';
import { uniq, snakeCase } from 'lodash';

const getData = state => state.keyVisualizations.data;

export const dropdownOption = label => ({
  label,
  value: snakeCase(label)
});

export const getTagOptions = createSelector(getData, data => {
  if (!data) return [];

  return uniq(data.reduce((acc, cur) => acc.concat(cur.tags), [])).map(
    dropdownOption
  );
});

export const getTopicOptions = createSelector(getData, data => {
  if (!data) return [];

  return uniq(data.reduce((acc, cur) => acc.concat([cur.topic]), [])).map(
    dropdownOption
  );
});

export const getGeographyOptions = createSelector(getData, data => {
  if (!data) return [];

  return uniq(data.reduce((acc, cur) => acc.concat(cur.geographies), [])).map(
    dropdownOption
  );
});
