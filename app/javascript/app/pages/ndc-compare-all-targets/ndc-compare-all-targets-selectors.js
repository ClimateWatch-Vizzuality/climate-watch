import { createSelector } from 'reselect';
import { filterQuery } from 'app/utils';
import deburr from 'lodash/deburr';
import isEmpty from 'lodash/isEmpty';
import { DOCUMENT_COLUMNS_SLUGS } from 'data/country-documents';
import { getDocumentsColumns } from 'utils/country-documents';

const getCountries = state => (state.countries && state.countries.data) || null;
const getCountriesDocuments = state =>
  (state.countriesDocuments && state.countriesDocuments.data) || null;

const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
export const getLoading = state =>
  state.compareAll.loading || state.countriesDocuments.loading || null;
export const getSearch = (state, { search }) => deburr(search.search) || '';
export const getQuery = (state, { search }) => search || '';

const getData = createSelector(
  [getCountries, getIndicatorsData, getCountriesDocuments],
  (countries, indicators, countriesDocuments) => {
    if (
      !countries ||
      !indicators ||
      !indicators.length ||
      !countriesDocuments
    ) {
      return null;
    }
    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    const rows = countries.map(c => {
      const countryEmissions = emissionsIndicator.locations[c.iso_code3];
      const countryDocuments =
        countriesDocuments && countriesDocuments[c.iso_code3];

      return {
        Country: c.wri_standard_name,
        'Share of global GHG emissions':
          countryEmissions && countryEmissions.value,
        iso: c.iso_code3,
        ...getDocumentsColumns(countryDocuments)
      };
    });
    return rows;
  }
);

export const getColumns = createSelector([getData], rows => {
  if (!rows) return [];
  const documentColumnNames = Object.keys(DOCUMENT_COLUMNS_SLUGS);
  return ['Country', 'Share of global GHG emissions', ...documentColumnNames];
});

const getFilteredDataBySearch = createSelector(
  [getData, getSearch],
  (data, search) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, search, [], { Country: 'name' });
  }
);

export const getTitleLinks = createSelector([getFilteredDataBySearch], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => [
    {
      columnName: 'Country',
      url: `/ndcs/country/${d.iso}`,
      value: d.Country
    }
  ]);
});

export const getRemoveISOfromData = createSelector(
  [getFilteredDataBySearch],
  data => {
    if (!data || isEmpty(data)) return null;
    return data.map(d => {
      const updatedD = { ...d };
      delete updatedD.iso;
      return updatedD;
    });
  }
);

export const getSelectedTargets = createSelector([getQuery], query => {
  if (!query || !query.targets) return [];
  return query.targets.split(',');
});

export const getCountryIsos = createSelector([getCountries], countries => {
  if (!countries) return null;
  const countryIsos = {};
  countries.forEach(c => {
    countryIsos[c.wri_standard_name] = c.iso_code3;
  });
  return countryIsos;
});

export const getSelectedTableTargets = createSelector(
  [getSelectedTargets],
  selectedTargets => {
    if (!selectedTargets) return [];
    const selectedTableTargets = selectedTargets.map(target => {
      const documentTarget = target.split('-')[1].split('_');
      if (
        documentTarget.length > 1 &&
        ['sectoral', 'framework'].includes(documentTarget[0])
      ) {
        return target.split('_')[0];
      }
      return target;
    });
    return selectedTableTargets;
  }
);
