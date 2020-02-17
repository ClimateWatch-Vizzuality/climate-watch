import { createSelector } from 'reselect';
import qs from 'query-string';

const INDC = ['INDC Submitted', 'First NDC Submitted', 'Second NDC Submitted'];
const NDC = ['First NDC Submitted', 'Second NDC Submitted'];

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
const getQuery = (state, { search }) => search || '';

const getCountryOptions = createSelector([getCountries], countries => {
  if (!countries) return [];
  return countries.map(({ wri_standard_name, iso_code3 }) => ({
    label: wri_standard_name,
    value: iso_code3
  }));
});

const getSelectedCountries = createSelector(
  [getCountryOptions, getQuery],
  (countriesData, query) => {
    if (!countriesData && !countriesData.length && !query) return null;
    const { country0, country1, country2 } = query;
    return {
      country0,
      country1,
      country2
    };
  }
);

const getSelectedDocuments = createSelector([getQuery], query => {
  if (!query) return null;
  const { document0, document1, document2 } = query;
  return {
    document0,
    document1,
    document2
  };
});

const getDocumentsOptionsByCountry = createSelector(
  [getSelectedCountries, getIndicatorsData],
  (selectedCountries, indicators) => {
    if (!selectedCountries || !indicators || !indicators.length) return null;

    const ndcIndicator = indicators.find(i => i.slug === 'submission');
    const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');

    const rows = Object.values(selectedCountries).reduce((acc, country) => {
      if (!country) return acc;

      const countryNDC = ndcIndicator.locations[country];
      const countryLTS = ltsIndicator.locations[country];

      let documents = [];

      if (INDC.includes(countryNDC.value)) {
        documents = [...documents, { label: 'INDC', value: 'INDC' }];
      }
      if (NDC.includes(countryNDC.value)) {
        documents = [...documents, { label: 'NDC', value: 'NDC' }];
      }
      if (countryNDC.value === 'Second NDC Submitted') {
        documents = [...documents, { label: '2nd NDC', value: '2nd NDC' }];
      }
      if (countryLTS && countryLTS.value === 'Long-term Strategy Submitted') {
        documents = [...documents, { label: 'LTS', value: 'LTS' }];
      }

      return {
        ...acc,
        [country]: documents
      };
    }, {});
    return rows;
  }
);

export const getFiltersData = createSelector(
  [
    getSelectedCountries,
    getCountryOptions,
    getSelectedDocuments,
    getDocumentsOptionsByCountry
  ],
  (selectedCountries, countryOptions, selectedDocuments, documentOptions) => {
    if (!countryOptions || !countryOptions.length || !selectedCountries) {
      return null;
    }

    const filtersData = Object.values(selectedCountries).map((country, i) => ({
      key: `filters-group-${i}`,
      countryParam: `country${i}`,
      countryValue: countryOptions.find(({ value }) => country === value),
      contriesOptions: countryOptions,
      documentParam: `document${i}`,
      documentValue:
        documentOptions &&
        documentOptions[country] &&
        documentOptions[country].find(
          ({ value }) => value === selectedDocuments[`document${i}`]
        ),
      documentOptions: documentOptions ? documentOptions[country] : []
    }));

    return filtersData;
  }
);

export const getAnchorLinks = createSelector(
  [state => state.route.routes || [], state => state.location.search],
  (routes, search) => {
    const searchQuery = qs.parse(search);
    const searchParams = { locations: searchQuery.locations };
    return routes
      .filter(route => route.anchor)
      .map(route => ({
        label: route.label,
        path: `/custom-compare/${route.param ? route.param : ''}`,
        search: `?${qs.stringify(searchParams)}`
      }));
  }
);

export default {
  getAnchorLinks,
  getFiltersData,
  getCountryOptions
};
