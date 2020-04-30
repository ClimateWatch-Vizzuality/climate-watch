import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniq } from 'lodash';
import { DOCUMENT_SLUGS } from 'data/country-documents';

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
const getCountriesDocuments = state =>
  (state.countriesDocuments && state.countriesDocuments.data) || null;
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

export const getDocumentsOptionsByCountry = createSelector(
  [getCountryOptions, getIndicatorsData, getCountriesDocuments],
  (countries, indicators, countriesDocuments) => {
    if (
      !countries ||
      !countries.length ||
      !indicators ||
      !indicators.length ||
      !countriesDocuments
    ) {
      return null;
    }
    const rows = countries.reduce((acc, { value: isoCode3 }) => {
      if (!isoCode3) return acc;
      const countryDocuments =
        countriesDocuments && countriesDocuments[isoCode3];

      const documents = DOCUMENT_SLUGS.map(slug => {
        const countryDocument =
          countriesDocuments && countryDocuments.find(d => d.slug === slug);
        if (countryDocument) {
          return { label: countryDocument.long_name, value: slug };
        }
        return null;
      }).filter(Boolean);

      return {
        ...acc,
        [isoCode3]: documents
      };
    }, {});
    return rows;
  }
);

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
