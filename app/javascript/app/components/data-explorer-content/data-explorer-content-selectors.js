import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_BLACKLIST,
  DATA_EXPLORER_METADATA_SOURCE
} from 'data/constants';

export const getData = createSelector(
  [state => state.data, state => state.section],
  (data, section) => {
    if (!data || !section) return null;
    return (data && data[section] && data[section].data) || null;
  }
);

export const getMeta = createSelector(
  [state => state.meta, state => state.section],
  (meta, section) => {
    if (!meta || isEmpty(meta) || !section) return null;
    const sectionMetadata = meta['section-metadata'];
    return sectionMetadata.find(
      s => s.source === DATA_EXPLORER_METADATA_SOURCE[section]
    );
  }
);

export const parseData = createSelector([getData], data => {
  if (!data || !data.length) return null;
  let updatedData = data;
  if (updatedData[0].emissions) {
    updatedData = updatedData.map(d => {
      const yearEmissions = {};
      d.emissions.forEach(e => {
        yearEmissions[e.year] = e.value;
      });
      return { ...d, ...yearEmissions };
    });
  }
  const whiteList = remove(
    Object.keys(updatedData[0]),
    n => DATA_EXPLORER_BLACKLIST.indexOf(n) === -1
  );
  return updatedData.map(d => pick(d, whiteList));
});
