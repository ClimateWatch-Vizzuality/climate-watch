import { createSelector } from 'reselect';
import { filterQuery } from 'app/utils';
import deburr from 'lodash/deburr';
import isEmpty from 'lodash/isEmpty';

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
        (countriesDocuments && countryDocuments.find(d => d.slug === slug)
          ? 'yes'
          : 'no');

      return {
        Country: { name: c.wri_standard_name, iso: c.iso_code3 },
        'Share of global GHG emissions':
          countryEmissions && countryEmissions.value,
        'Pre-2020 Pledges': getIconValue('pledges'),
        INDC: getIconValue('indc'),
        NDC: getIconValue('first_ndc'),
        '2nd NDC': getIconValue('second_ndc'),
        'Targets in National Policies': getIconValue('targets'),
        LTS: getIconValue('lts')
      };
    });
    return rows;
  }
);

export const getColumns = createSelector([getData], rows => {
  if (!rows) return [];
  return [
    'Country',
    'Share of global GHG emissions',
    'Pre-2020 Pledges',
    'INDC',
    'NDC',
    '2nd NDC',
    'Targets in National Policies',
    'LTS'
  ];
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
