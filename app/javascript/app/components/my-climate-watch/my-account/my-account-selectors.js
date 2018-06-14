import { createSelector } from 'reselect';

const getCountries = state => state.countries;
const getSectors = state => state.sectors;
const getUserSector = state => state.userSector;
const getUserCountry = state => state.userCountry;

export const countriesSelector = createSelector(getCountries, countries =>
  countries.data.map(country => ({
    value: country.wri_standard_name,
    label: country.wri_standard_name
  }))
);

export const sectorsSelector = createSelector(getSectors, sectors =>
  sectors.map(sector => ({ value: sector, label: sector }))
);

export const userSectorSelector = createSelector(getUserSector, sector => ({
  value: sector,
  label: sector
}));

export const userCountrySelector = createSelector(getUserCountry, country => ({
  value: country,
  label: country
}));
