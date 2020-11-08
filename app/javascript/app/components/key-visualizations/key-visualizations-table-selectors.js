import { createSelector } from 'reselect';
import { snakeCase, uniq } from 'lodash';

const getData = kvt => kvt.state.keyVisualizations.data;
const getTagsSelection = kvt =>
  (kvt.search.tags && kvt.search.tags.split(',')) || null;
const getTopicSelection = kvt => kvt.search.topic || null;
const getGeographySelection = kvt => kvt.search.geography || null;

export const dropdownOption = label => ({
  label,
  value: snakeCase(label)
});

export const getFormattedKeyVisualizations = createSelector(getData, data => {
  if (!data) return [];

  return data.map(item => {
    const copy = Object.assign({}, item);
    copy.geographies = item.geographies.map(label => dropdownOption(label));
    copy.tags = item.tags.map(label => dropdownOption(label));
    copy.topic = dropdownOption(copy.topic);

    return copy;
  });
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

export const getTagsSelected = createSelector(
  [getTagOptions, getTagsSelection],
  (tags, selected) => {
    if (!tags) return null;
    if (!selected) return tags;
    return tags.filter(t => selected.indexOf(t.value) !== -1);
  }
);

export const getTopicSelected = createSelector(
  [getTopicOptions, getTopicSelection],
  (topics, selected) => {
    if (!topics) return null;
    if (!selected) return topics[0];
    return topics.find(topic => topic.value === selected);
  }
);

export const getGeographyOptions = createSelector(getData, data => {
  if (!data) return [];

  return uniq(data.reduce((acc, cur) => acc.concat(cur.geographies), [])).map(
    dropdownOption
  );
});

export const getGeographySelected = createSelector(
  [getGeographyOptions, getGeographySelection],
  (geos, selected) => {
    if (!geos) return null;
    if (!selected) return geos[0];
    return geos.find(geo => geo.value === selected);
  }
);
