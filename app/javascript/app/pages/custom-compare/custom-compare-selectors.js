import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniq } from 'lodash';
// import { DOCUMENT_COLUMNS_SLUGS } from 'data/country-documents';

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
const getCountriesDocuments = state => {
  if (!state.countriesDocuments || !state.countriesDocuments.data) return null;
  const {
    documents = [],
    framework = [],
    sectoral = []
  } = state.countriesDocuments.data;
  return { documents, framework, sectoral };
};
const getCountriesDocumentsData = state =>
  (state.countriesDocuments &&
    state.countriesDocuments.data &&
    state.countriesDocuments.data.data) ||
  null;
const getQuery = (state, { search }) => search || '';

export const getBackButtonLink = createSelector([getQuery], query => {
  if (!query) return '/compare-all-targets';
  const targetParams = query.targets ? query.targets.split(',') : [];
  const documentParams = uniq(
    targetParams.filter(target => !target.endsWith('-'))
  );
  return `/compare-all-targets?targets=${documentParams}`;
});

const getCountryOptions = createSelector([getCountries], countries => {
  if (!countries) return [];
  return countries.map(({ wri_standard_name, iso_code3 }) => ({
    label: wri_standard_name,
    value: iso_code3
  }));
});

export const DOCUMENT_COLUMNS_SLUGS = {
  'Pre-2020 Pledges': 'pledges',
  INDC: 'indc',
  NDC: 'first_ndc',
  '2nd NDC': 'second_ndc',
  LTS: 'lts'
};

export const getSelectedTargets = createSelector([getQuery], query => {
  if (!query) return null;
  const queryTargets = query.targets ? query.targets.split(',') : [];
  return [1, 2, 3].map((value, i) => {
    // targets are saved as a string 'ISO3-DOCUMENT', e.g. 'USA-NDC'
    const target =
      queryTargets && queryTargets[i] && queryTargets[i].split('-');
    const country = target && target[0];
    const document = target && target[1];
    return { key: `target${i}`, country, document };
  });
});

export const getSelectedCountries = createSelector(
  [getSelectedTargets],
  selectedTargets => {
    if (!selectedTargets) return null;
    const selectedCountries = selectedTargets
      .map(({ country }) => country)
      .join(',');
    return selectedCountries;
  }
);

export const getDocumentsOptionsByCountry = createSelector(
  [
    getCountryOptions,
    getIndicatorsData,
    getCountriesDocuments,
    getCountriesDocumentsData
  ],
  (countries, indicators, countriesDocuments, countriesDocumentsData) => {
    if (
      !countries ||
      !countries.length ||
      !indicators ||
      !indicators.length ||
      !countriesDocuments ||
      !countriesDocumentsData
    ) {
      return null;
    }

    const selectedCountries = Object.keys(countriesDocumentsData);
    const rows = selectedCountries.reduce((acc, iso3) => {
      const documents = Object.values(DOCUMENT_COLUMNS_SLUGS)
        .map(slug => {
          const countryDocument =
            countriesDocumentsData &&
            countriesDocumentsData[iso3].find(d => d.slug === slug);
          if (countryDocument) {
            return { label: countryDocument.long_name, value: slug };
          }
          return null;
        })
        .filter(Boolean);

      const { framework, sectoral } = countriesDocuments;
      const frameworkDocuments = framework
        .filter(doc => doc.iso === iso3)
        .map(doc => ({ label: doc.long_name, value: doc.slug, id: doc.id }));
      const sectoralDocuments = sectoral
        .filter(doc => doc.iso === iso3)
        .map(doc => ({ label: doc.long_name, value: doc.slug, id: doc.id }));

      return {
        ...acc,
        [iso3]: [...documents, ...frameworkDocuments, ...sectoralDocuments]
      };
    }, {});
    return rows;
  }
);

export const getFiltersData = createSelector(
  [getCountryOptions, getDocumentsOptionsByCountry, getSelectedTargets],
  (countryOptions, documentOptions, targets) => {
    if (
      !countryOptions ||
      !countryOptions.length ||
      !targets ||
      !targets.length
    ) {
      return null;
    }

    const filtersData = targets.map(({ key, country, document }) => ({
      key,
      countryValue: countryOptions.find(({ value }) => country === value),
      contriesOptions: countryOptions,
      documentValue:
        documentOptions &&
        document &&
        documentOptions[country] &&
        documentOptions[country].find(({ value }) => value === document),
      documentOptions: documentOptions ? documentOptions[country] : []
    }));
    return filtersData;
  }
);

export const getAnchorLinks = createSelector(
  [state => state.route.routes || [], getQuery],
  (routes, query) =>
    routes
      .filter(route => route.anchor)
      .map(route => ({
        label: route.label,
        path: `/custom-compare/${route.param ? route.param : ''}`,
        search: `?${qs.stringify(query)}`
      }))
);
