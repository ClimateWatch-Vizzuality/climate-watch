import { createSelector } from 'reselect';

export const getMetadata = state =>
    !state.metadata.loading ? state.metadata.data : null;

export const get2025NdcTracker = state =>
    !state.ndc2025Tracker?.loading ? state.ndc2025Tracker?.data : null;

export const getData = createSelector([get2025NdcTracker], (ndc2025Tracker) => {
    const { data } = ndc2025Tracker;
    return data;
  });