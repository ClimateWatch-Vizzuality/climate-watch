import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniq } from 'lodash';

const INDC = ['INDC Submitted', 'First NDC Submitted', 'Second NDC Submitted'];
const NDC = ['First NDC Submitted', 'Second NDC Submitted'];

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;
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
  [getCountryOptions, getIndicatorsData],
  (countries, indicators) => {
    if (!countries || !countries.length || !indicators || !indicators.length) {
      return null;
    }

    const ndcIndicator = indicators.find(i => i.slug === 'submission');
    const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');

    const rows = countries.reduce((acc, { value: country }) => {
      if (!country) return acc;

      const countryNDC = ndcIndicator.locations[country] || {};
      const countryLTS = ltsIndicator.locations[country] || {};

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
