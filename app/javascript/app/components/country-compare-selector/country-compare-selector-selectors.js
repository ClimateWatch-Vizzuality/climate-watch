import { createSelector } from 'reselect';

const getCountries = state => state.countriesData || null;
const getLocations = state => state.locations || null;

export const getSelectedCountries = createSelector(
  [getCountries, getLocations],
  (countries, locations) => {
    if (!countries && !countries.length) return null;
    const selectedCountriesData = locations.concat([]);
    if (locations.length === 1) selectedCountriesData.push(2, 3);
    if (locations.length === 2) selectedCountriesData.push(3);
    const selectedCountries = selectedCountriesData.map(location => {
      if (parseInt(location, 10)) return null;
      const countryDetail = countries.find(
        country => country.iso_code3 === location
      );
      return {
        label: countryDetail && countryDetail.wri_standard_name,
        value: countryDetail && countryDetail.iso_code3
      };
    });
    return selectedCountries;
  }
);

export const getCountriesOptions = createSelector(
  [getCountries, getSelectedCountries],
  (countries, selectedCountries) => {
    const selectedCountriesLabels = selectedCountries.map(
      s => (s ? s.value : null)
    );
    return countries
      .filter(
        country => selectedCountriesLabels.indexOf(country.iso_code3) === -1
      )
      .map(country => ({
        label: country.wri_standard_name,
        value: country.iso_code3
      }));
  }
);

export const getCountryConfig = createSelector(
  [getSelectedCountries],
  countries => {
    if (!countries && !countries.length) return null;
    return countries.map(country => ({
      country,
      color: null
    }));
  }
);

export default {
  getCountriesOptions,
  getSelectedCountries,
  getCountryConfig
};
