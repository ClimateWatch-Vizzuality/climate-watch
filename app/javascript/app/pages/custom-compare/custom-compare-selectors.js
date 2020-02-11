import { createSelector } from 'reselect';
import qs from 'query-string';

const getCountries = state => (state.countries && state.countries.data) || null;
const getIndicatorsData = state =>
  (state.compareAll.data && state.compareAll.data.indicators) || null;

// export const getLoading = state => state.compareAll.loading || null;
export const getQuery = (state, { search }) => search || '';

export const getCountriesOptions = createSelector([getCountries], countries => {
  if (!countries) return [];
  return countries.map(({ wri_standard_name, iso_code3 }) => ({
    label: wri_standard_name,
    value: iso_code3
  }));
});

export const getFiltersSelected = createSelector(
  [getCountriesOptions, getQuery],
  (countriesData, query) => {
    if (!countriesData) return null;
    const { country0, country1, country2 } = query;
    return [
      {
        selectedCountry:
          countriesData.find(({ value }) => value === country0) ||
          countriesData[0],
        selectedDocument: null,
        key: 'country0'
      },
      {
        selectedCountry:
          countriesData.find(({ value }) => value === country1) ||
          countriesData[1],
        selectedDocument: null,
        key: 'country1'
      },
      {
        selectedCountry:
          countriesData.find(({ value }) => value === country2) ||
          countriesData[2],
        selectedDocument: null,
        key: 'country2'
      }
    ];
  }
);

export const getFiltersData = createSelector(
  [getCountries, getIndicatorsData],
  (countries, indicators) => {
    if (!countries || !indicators || !indicators.length) return null;

    // const ndcIndicator = indicators.find(i => i.slug === 'submission');
    // const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    // const ltsIndicator = indicators.find(i => i.slug === 'lts_submission');
    // const rows = countries.map(c => {
    //   const countryNDC = ndcIndicator.locations[c.iso_code3];
    //   const countryLTS = ltsIndicator.locations[c.iso_code3];
    //   const countryEmissions = emissionsIndicator.locations[c.iso_code3];
    //   const getIconValue = (conditionYes, conditionIntends) => {
    //     if (conditionYes) return 'yes';
    //     if (conditionIntends) return 'intends';
    //     return 'no';
    //   };
    //   return {
    //     Country: { name: c.wri_standard_name, iso: c.iso_code3 },
    //     'Share of global GHG emissions':
    //       countryEmissions && countryEmissions.value,
    //     INDC: getIconValue(
    //       countryNDC.value === 'INDC Submitted' ||
    //         countryNDC.value === 'First NDC Submitted' ||
    //         countryNDC.value === 'Second NDC Submitted'
    //     ),
    //     NDC: getIconValue(
    //       countryNDC.value === 'First NDC Submitted' ||
    //         countryNDC.value === 'Second NDC Submitted'
    //     ),
    //     '2nd NDC': getIconValue(countryNDC.value === 'Second NDC Submitted'),
    //     LTS: getIconValue(
    //       countryLTS && countryLTS.value === 'Long-term Strategy Submitted'
    //     )
    //   };
    // });
    // return rows;
    return [];
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
  getCountriesOptions,
  getFiltersSelected
};
