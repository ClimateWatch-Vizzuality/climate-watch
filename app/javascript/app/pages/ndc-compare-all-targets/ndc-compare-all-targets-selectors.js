import { createSelector } from 'reselect';
import { filterQuery } from 'app/utils';
import deburr from 'lodash/deburr';
import isEmpty from 'lodash/isEmpty';
import { DOCUMENT_COLUMNS_SLUGS } from 'data/country-documents';

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
      const getIconValue = slug =>
        // TODO: Intends submisstion return 'intends'
        (countryDocuments && countryDocuments.find(d => d.slug === slug)
          ? 'yes'
          : 'no');

      const documentsColumns = Object.keys(DOCUMENT_COLUMNS_SLUGS).reduce(
        (acc, nextColumn) => {
          const slug = DOCUMENT_COLUMNS_SLUGS[nextColumn];
          return { ...acc, [nextColumn]: getIconValue(slug) };
        },
        {}
      );

      return {
        Country: { name: c.wri_standard_name, iso: c.iso_code3 },
        'Share of global GHG emissions':
          countryEmissions && countryEmissions.value,
        ...documentsColumns
      };
    });
    return rows;
  }
);

export const getColumns = createSelector([getData], rows => {
  if (!rows) return [];
  const docoumentColumnNames = Object.keys(DOCUMENT_COLUMNS_SLUGS);
  return ['Country', 'Share of global GHG emissions', ...docoumentColumnNames];
});

export const getFilteredDataBySearch = createSelector(
  [getData, getSearch],
  (data, search) => {
    if (!data || isEmpty(data)) return null;
    return filterQuery(data, search, [], { Country: 'name' });
  }
);

export const getSelectedTargets = createSelector([getQuery], query => {
  if (!query || !query.targets) return [];
  const selectedTargets = query.targets.split(',');
  return selectedTargets;
});
