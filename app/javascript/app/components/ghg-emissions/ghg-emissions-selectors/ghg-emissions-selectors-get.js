import { createSelector } from 'reselect';
import { toPlural } from 'utils/ghg-emissions';

// meta data for selectors
export const getData = ({ emissions }) => (emissions && emissions.data) || [];
export const getMeta = ({ ghgEmissionsMeta }) =>
  (ghgEmissionsMeta && ghgEmissionsMeta.meta) || null;
export const getRegions = ({ regions }) => (regions && regions.data) || null;
export const getDataZoomYears = ({ dataZoom }) =>
  (dataZoom && dataZoom.years) || null;
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

// export const getLinkToDataExplorer = createSelector([getSearch], search => {
//   const section = 'historical-emissions';
//   return generateLinkToDataExplorer(search, section);
// });

// export const getLinkToDataExplorer = createSelector(
//   [getSearch, getSelectedCategory, getSelectedIndicator],
//   (search, selectedCategory, selectedIndicator) => {
//     const section = 'historical-emissions';
//     let dataExplorerSearch = search || {};
//     if (selectedCategory && selectedIndicator) {
//       dataExplorerSearch = {
//         category: selectedCategory.value,
//         indicator: selectedIndicator.value,
//         ...search
//       };
//     }
//     return generateLinkToDataExplorer(dataExplorerSearch, section);
//   }
// );
