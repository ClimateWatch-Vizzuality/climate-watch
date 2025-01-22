import { createSelector } from 'reselect';

const getGlobalEmissions = state => (state.ndcContentGlobalEmissions?.data) || null;

export const getData = createSelector([getGlobalEmissions], () => {});
