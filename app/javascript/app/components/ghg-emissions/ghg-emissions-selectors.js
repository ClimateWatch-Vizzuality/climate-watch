import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';
import omit from 'lodash/omit';

const getMetadata = state => state.meta || {};
const getRegions = state => state.regions || [];
const getSourceSelection = state => parseInt(state.search.source, 10) || null;
const getBreakSelection = state => state.search.breakBy || null;
const getFilterSelection = state => parseInt(state.search.filter, 10) || null;
const getMetaFiltered = meta => omit(meta, 'data_source');

const parseRegions = regions =>
  regions.map(region => ({
    label: region.wri_standard_name,
    value: region.iso_code3
  }));

export const getFilters = createSelector(
  [getMetadata, getRegions],
  (meta, regions) => ({
    ...getMetaFiltered(meta),
    regions: parseRegions(regions)
  })
);

export const getSourceOptions = createSelector(
  getMetadata,
  meta => meta.data_source || []
);

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (sources.length > 0) {
      if (selected) {
        const filtered = sources.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : sources[0];
      }
      return sources[0];
    }
    return {};
  }
);

export const getBreaksByOptions = createSelector(getMetadata, meta => {
  const breakByOptions = Object.keys(getMetaFiltered(meta)).map(other => ({
    label: upperFirst(other),
    value: other,
    id: other
  }));
  const regionBreak = {
    label: 'Regions',
    value: 'regions',
    id: 'regions'
  };
  return [...breakByOptions, regionBreak];
});

export const getBreakSelected = createSelector(
  [getBreaksByOptions, getBreakSelection],
  (breaks, selected) => {
    if (breaks.length > 0) {
      if (selected) {
        const filtered = breaks.filter(category => category.value === selected);
        return filtered.length > 0 ? filtered[0] : breaks[0];
      }
      return breaks[0];
    }
    return {};
  }
);

export const getFilterOptions = createSelector(
  [getBreakSelected, getFilters],
  (breakSelected, filters) => filters[breakSelected.value] || []
);

export const getFilterSelected = createSelector(
  [getFilterOptions, getFilterSelection],
  (filters, selected) => {
    if (filters.length > 0) {
      if (selected) {
        const filtered = filters.filter(filter => filter.value === selected);
        return filtered.length > 0 ? filtered[0] : {};
      }
      return filters[0];
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
