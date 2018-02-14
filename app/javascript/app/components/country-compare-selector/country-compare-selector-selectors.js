import { createSelector } from 'reselect';
import { COUNTRY_COMPARE_COLORS } from 'data/constants';

const COUNTRIES_TO_SELECT = 3;

const getCountries = state => state.countriesData || null;
const getLocations = state => state.locations || null;

export const getSelectedCountries = createSelector(
  [getCountries, getLocations],
  (countries, locations) => {
    if (!countries && !countries.length) return null;
    const selectedCountriesData = [...locations];
    while (selectedCountriesData.length < COUNTRIES_TO_SELECT) {
      selectedCountriesData.push(null);
    }
    const selectedCountries = selectedCountriesData.map(location => {
      if (!location) return null;
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
    return countries.map((country, i) => ({
      country,
      color: COUNTRY_COMPARE_COLORS[i]
    }));
  }
);

export default {
  getCountriesOptions,
  getSelectedCountries,
  getCountryConfig
};
