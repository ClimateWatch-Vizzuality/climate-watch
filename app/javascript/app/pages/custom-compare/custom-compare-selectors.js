import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniq } from 'lodash';

export const OTHER_DOCUMENTS_SLUGS = [
  'pledges',
  'indc',
  'first_ndc',
  'second_ndc',
  'lts'
];

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
const getCountriesDocuments = state => {
  if (!state.countriesDocuments) return null;
  const {
    documents = [],
    framework = [],
    sectoral = []
  } = state.countriesDocuments;
  return { documents, framework, sectoral };
};
const getCountriesDocumentsData = state =>
  (state.countriesDocuments && state.countriesDocuments.data) || null;
export const getCountriesDocumentsLoading = state =>
  (state.countriesDocuments && state.countriesDocuments.loading) || false;
const getQuery = (state, { search }) => search || '';

const createDropdownOption = (data, group) =>
  (data
    ? {
      label: data.long_name,
      value: data.slug,
      id: data.id,
      optGroup: group
    }
    : null);

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

export const getSelectedTargets = createSelector([getQuery], query => {
  if (!query) return null;
  const queryTargets = query.targets ? query.targets.split(',') : [];
  return [1, 2, 3].map((value, i) => {
    // targets are saved as a string 'ISO3-DOCUMENT', e.g. 'USA-NDC'
    const target =
      queryTargets && queryTargets[i] && queryTargets[i].split(/-(.+)/);
    const country = target && target[0].replace('-', '');
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
  [getIndicatorsData, getCountriesDocuments, getCountriesDocumentsData],
  (indicators, countriesDocuments, countriesDocumentsData) => {
    if (
      !indicators ||
      !indicators.length ||
      !countriesDocuments ||
      !countriesDocumentsData
    ) {
      return null;
    }
    const selectedCountries = Object.keys(countriesDocumentsData);
    const rows = selectedCountries.reduce((acc, iso3) => {
      const otherDocuments = OTHER_DOCUMENTS_SLUGS.map(slug => {
        const countryDocument =
          countriesDocumentsData &&
          countriesDocumentsData[iso3] &&
          countriesDocumentsData[iso3].find(d => d.slug === slug);
        return createDropdownOption(countryDocument, '');
      }).filter(Boolean);

      const { framework, sectoral } = countriesDocuments;

      const frameworkDocuments = framework
        .filter(doc => doc.iso === iso3)
        .map(doc => createDropdownOption(doc, 'framework'));

      const sectoralDocuments = sectoral
        .filter(doc => doc.iso === iso3)
        .map(doc => createDropdownOption(doc, 'sectoral'));

      return {
        ...acc,
        [iso3]: [...otherDocuments, ...frameworkDocuments, ...sectoralDocuments]
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

    const filtersData = targets.map(({ key, country, document }) => {
      const selectedDocument =
        documentOptions &&
        document &&
        documentOptions[country] &&
        documentOptions[country].find(({ value }) => value === document);

      const defaultDocument =
        documentOptions &&
        document &&
        documentOptions[country] &&
        documentOptions[country].find(({ optGroup }) => {
          const documentsGroup = document.split('-')[0];
          return optGroup === documentsGroup;
        });

      return {
        key,
        countryValue: countryOptions.find(({ value }) => country === value),
        contriesOptions: countryOptions,
        documentValue: selectedDocument || defaultDocument,
        documentOptions: documentOptions ? documentOptions[country] : []
      };
    });
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
