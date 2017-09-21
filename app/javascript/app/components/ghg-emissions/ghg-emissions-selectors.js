import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';

function filterDataSourceMeta(meta) {
  const { data_source, ...others } = meta;
  return others;
}

const getMetadata = state => state.meta || {};
const getSourceSelection = state => parseInt(state.search.source, 10) || null;
const getBreakSelection = state => state.search.breakBy || null;
const getFilterSelection = state => state.search.filter || null;

const getSelections = state => ({
  ...filterDataSourceMeta(state.meta),
  regions: state.regions
});

export const getSourcesData = createSelector(
  getMetadata,
  meta => meta.data_source || {}
);
export const getSourceOptions = createSelector(getSourcesData, sources =>
  Object.keys(sources).map(source => ({
    label: sources[source].name,
    value: sources[source].id,
    id: source
  }))
);

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (sources.length > 0) {
      if (selected) {
        const filtered = sources.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : {};
      }
      return sources[0];
    }
    return {};
  }
);

export const getBreaksByOptions = createSelector(getMetadata, meta => {
  const metaFiltered = filterDataSourceMeta(meta);
  const breakBy = Object.keys(metaFiltered).map(other => ({
    label: upperFirst(other),
    value: other,
    id: other
  }));
  const regionBreak = {
    label: 'Regions',
    value: 'regions',
    id: 'regions'
  };
  return [...breakBy, regionBreak];
});

export const getBreakSelected = createSelector(
  [getBreaksByOptions, getBreakSelection],
  (breaks, selected) => {
    if (breaks.length > 0) {
      if (selected) {
        const filtered = breaks.filter(category => category.value === selected);
        return filtered.length > 0 ? filtered[0] : {};
      }
      return breaks[0];
    }
    return {};
  }
);

export const getFilterOptions = createSelector(
  [getBreakSelected, getSelections],
  (breakSelected, selections) => selections[breakSelected.value] || {}
);

export const getFilterSelected = createSelector(
  [getFilterOptions, getFilterSelection],
  (filter, selected) => {
    if (filter.length > 0) {
      if (selected) {
        const filtered = filter.filter(category => category.value === selected);
        return filtered.length > 0 ? filtered[0] : {};
      }
      return filter[0];
    }
    return {};
  }
);

export default {
  getSourceOptions,
  getSourceSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFilterSelected
};
