import { createSelector } from 'reselect';
// import { TOP_10_EMITTERS, TOP_10_EMITTERS_OPTION } from 'constants/constants';

// meta data for selectors
export const getMetadata = state => state.meta || null;
export const getSourcesMeta = createSelector(
  getMetadata,
  meta => (meta && meta.data_source) || null
);
export const getVersionsMeta = createSelector(
  getMetadata,
  meta => (meta && meta.gwp) || null
);
export const getRegionsMeta = state => state.regions || null;

// values from search
export const getSearch = state => state.search || null;
// const getSourceSelection = state => state.search.source || null;
// const getVersionSelection = state => state.search.version || null;
// const getBreakSelection = state => state.search.breakBy || null;
// const getFilterSelection = state => state.search.filter;

// export const getMetadata = ({ metadata }) =>
//   metadata && metadata.ghg && metadata.ghg.data || null;

// data for the graph
export const getEmissionsData = state => state.data || [];

export const getQuery = ({ location }) => (location && location.query) || null;

// export const getDefaultTop10EmittersOption = createSelector(
//   getMetadata,
//   meta => {
//     if (!meta) return null;
//     const value = TOP_10_EMITTERS_OPTION.value.map(p => {
//       const location = meta.location.find(l => l.label === p);
//       return location && location.value;
//     }).join();
//     return { label: TOP_10_EMITTERS, value };
//   }
// );

// export const getTop10EmitterSplittedOptions = createSelector(
//   getMetadata,
//   meta => {
//     if (!meta) return null;
//     return TOP_10_EMITTERS_OPTION.value.map(p => {
//       const emitterOption = meta.location.find(l => l.label === p);
//       return { label: emitterOption.label, value: String(emitterOption.value) };
//     });
//   }
// );
