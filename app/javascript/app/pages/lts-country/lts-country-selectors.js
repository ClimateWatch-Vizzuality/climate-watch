import { createSelector } from 'reselect';
import qs from 'query-string';

const getCountries = state => state.countries || null;
const getIso = state => state.iso || null;
const getIndicators = state =>
  (state.LTS.data && state.LTS.data.indicators) || null;

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getAnchorLinks = createSelector(
  [
    state => state.route.routes || [],
    state => state.iso,
    state => state.location.search
  ],
  (routes, iso, search) => {
    const searchParams = { search: qs.parse(search).search };
    return routes
      .filter(route => route.anchor)
      .map(route => ({
        label: route.label,
        path: `/lts/country/${iso}/${route.param ? route.param : ''}`,
        search: `?${qs.stringify(searchParams)}`
      }));
  }
);

export const getDocumentLink = createSelector(
  [getIndicators, getIso],
  (indicators, iso) => {
    if (!indicators || !iso) return null;
    const documentIndicator = indicators.find(i => i.slug === 'lts_document');
    if (!documentIndicator || !documentIndicator.locations[iso]) return null;
    const parsedLinkMatch = documentIndicator.locations[iso].value.match(
      /href="(.+)">/
    );
    return (parsedLinkMatch && parsedLinkMatch[1]) || null;
  }
);

export const addUrlAndHasDataToCountries = createSelector(
  [getCountries, getCountry, getIndicators],
  (countries, country, indicators) => {
    if (!countries || !indicators) return null;
    const submissionIndicator = indicators.find(
      i => i.slug === 'lts_submission'
    );
    return countries
      .filter(c => c.iso_code3 !== country.iso_code3)
      .map(c => ({
        value: c.iso_code3,
        label: c.wri_standard_name,
        hasData:
          submissionIndicator && submissionIndicator.locations[c.iso_code3]
      }));
  }
);
