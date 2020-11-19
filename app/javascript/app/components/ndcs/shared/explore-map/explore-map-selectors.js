import { createSelector } from 'reselect';

const getSearch = state => state.search || null;
export const getIsShowEUCountriesChecked = createSelector(
  getSearch,
  search => search.showEUCountries === 'true'
);
