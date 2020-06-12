import { createSelector } from 'reselect';
import { toPlural } from 'utils/ghg-emissions';
import { generateLinkToDataExplorer } from 'utils/data-explorer';

// meta data for selectors
export const getData = ({ emissions }) => (emissions && emissions.data) || [];
export const getMeta = ({ ghgEmissionsMeta }) =>
  (ghgEmissionsMeta && ghgEmissionsMeta.meta) || null;
export const getRegions = ({ regions }) => (regions && regions.data) || null;
export const getCountries = ({ countries }) =>
  (countries && countries.data) || null;
export const getSources = createSelector(
  getMeta,
  meta => (meta && meta.data_source) || null
);
export const getWBData = ({ wbCountryData }) => wbCountryData.data || null;

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
