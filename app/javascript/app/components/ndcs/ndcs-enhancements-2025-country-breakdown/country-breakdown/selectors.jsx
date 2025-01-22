import { createSelector } from 'reselect';

const getCountryEmissions = state => (state.ndcContentCountryEmissions?.data) || null;

export const getData = createSelector([getCountryEmissions], () => {});
