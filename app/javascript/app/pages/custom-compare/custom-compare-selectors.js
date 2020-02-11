import { createSelector } from 'reselect';
import qs from 'query-string';

const INDC = ['INDC Submitted', 'First NDC Submitted', 'Second NDC Submitted'];
const NDC = ['First NDC Submitted', 'Second NDC Submitted'];

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;

// export const getLoading = state => state.compareAll.loading || null;
export const getQuery = (state, { search }) => search || '';

export const getCountryOptions = createSelector([getCountries], countries => {
  if (!countries) return [];
  return countries.map(({ wri_standard_name, iso_code3 }) => ({
    label: wri_standard_name,
    value: iso_code3
  }));
});

//zabezpiecz query
export const getSelectedCountries = createSelector(
  [getCountryOptions, getQuery],
  (countriesData, query) => {
    if (!countriesData) return null;
    const { country0, country1, country2 } = query;
    return {
      country0,
      country1,
      country2
    };
  }
);

export const getSelectedDocuments = createSelector([getQuery], query => {
  if (!query) return null;
  const { document0, document1, document2 } = query;
  return {
    document0,
    document1,
    document2
  };
});

export const getDocumentsOptionsByCountry = createSelector(
  [getSelectedCountries, getIndicatorsData],
  (selectedCountries, indicators) => {
    if (!selectedCountries || !indicators || !indicators.length) return null;
    const ndcIndicator = indicators.find(i => i.slug === 'submission');
    const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');

    const rows = Object.keys(selectedCountries).reduce((acc, key) => {
      if (!selectedCountries[key]) return null;

      const iso = selectedCountries[key];

      const countryNDC = ndcIndicator.locations[iso];
      const countryLTS = ltsIndicator.locations[iso];

      let documents = [];

      if (INDC.includes(countryNDC.value))
        documents = [...documents, { label: 'INDC', value: 'INDC' }];
      if (NDC.includes(countryNDC.value))
        documents = [...documents, { label: 'NDC', value: 'NDC' }];
      if (countryNDC.value === 'Second NDC Submitted')
        documents = [...documents, { label: '2nd NDC', value: '2nd NDC' }];
      if (countryLTS && countryLTS.value === 'Long-term Strategy Submitted')
        documents = [...documents, { label: 'LTS', value: 'LTS' }];

      return {
        ...acc,
        [iso]: documents
      };
    }, {});
    console.log(rows);
    return rows;
  }
);

// export const getFiltersSelected = createSelector(
//   [getCountryOptions, getQuery],
//   (countriesData, query) => {
//     if (!countriesData) return null;
//     const { country0, country1, country2 } = query;
//     return [
//       {
//         selectedCountry:
//           countriesData.find(({ value }) => value === country0),
//         selectedDocument: null,
//         key: 'country0'
//       },
//       {
//         selectedCountry:
//           countriesData.find(({ value }) => value === country1),
//         selectedDocument: null,
//         key: 'country1'
//       },
//       {
//         selectedCountry:
//           countriesData.find(({ value }) => value === country2),
//         selectedDocument: null,
//         key: 'country2'
//       }
//     ];
//   }
// );

export const getFiltersData = createSelector(
  [getSelectedCountries, getDocumentsOptionsByCountry, getSelectedDocuments],
  (selectedCountries, documentOptions, selectedDocuments) => {
    if (!selectedCountries) return null;
    const filtersData = Object.keys(selectedCountries).map((key, i) => ({
      index: `${i}`,
      selectedCountry: selectedCountries[key],
      documentOptions: documentOptions[selectedCountries[key]],
      selectedDocument: selectedDocuments[`document${i}`]
    }));

    return filtersData;
  }
  // [getFiltersSelected, getIndicatorsData],
  // (filters, indicators) => {
  //   if (!filters || !indicators || !indicators.length) return null;

  //   const ndcIndicator = indicators.find(i => i.slug === 'submission');
  //   const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');

  //   const rows = filters.reduce((acc, { selectedCountry }) => {
  //     if (!selectedCountry) return null;
  //     const countryNDC = ndcIndicator.locations[selectedCountry.value];
  //     const countryLTS = ltsIndicator.locations[selectedCountry.value];

  //     let documents = [];

  //     if (INDC.includes(countryNDC.value)) documents = [...documents, { label: 'INDC', value: 'INDC' }]
  //     if (NDC.includes(countryNDC.value)) documents = [...documents, { label: 'NDC', value: 'NDC' }]
  //     if (countryNDC.value === 'Second NDC Submitted') documents = [...documents, { label: '2nd NDC', value: '2nd NDC' }]
  //     if (countryLTS && countryLTS.value === 'Long-term Strategy Submitted') documents = [...documents, { label: 'LTS', value: 'LTS' }]

  //     return {
  //       ...acc,
  //       [selectedCountry.value]: documents
  //     };
  //   }, {});
  //   console.log(rows);
  //   return rows;
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
  // ,
  // getFiltersSelected
};
