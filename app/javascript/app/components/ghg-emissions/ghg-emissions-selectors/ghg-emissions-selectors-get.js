import { createSelector } from 'reselect';
import { toPlural } from 'utils/ghg-emissions';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
// meta data for selectors
export const getData = state =>
  (state && state.emissions && state.emissions.data) || [];
export const getMeta = state =>
  (state && state.ghgEmissionsMeta && state.ghgEmissionsMeta.meta) || null;
export const getRegions = state =>
  (state && state.regions && state.regions.data) || null;
export const getCountries = state =>
  (state && state.countries && state.countries.data) || null;
export const getSources = createSelector(
  getMeta,
  meta => (meta && meta.data_source) || null
);
export const getWBData = state =>
  (state && state.wbCountryData && state.wbCountryData.data) || null;

// values from search
export const getSearch = (state, { search }) => search || null;
export const getSelection = field =>
  createSelector(getSearch, search => {
    if (!search) return null;
    if (field === 'location') return search.regions;
    return search[field] || search[toPlural(field)];
  });

export const getDataZoomYears = createSelector(getSearch, search => {
  if (!search) return null;
  return { min: search.start_year, max: search.end_year };
});

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'historical-emissions';
  return generateLinkToDataExplorer(search, section);
});
