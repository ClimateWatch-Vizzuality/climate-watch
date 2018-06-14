import { createSelector } from 'reselect';

const getCountries = state => state.countries;
const getSectors = state => state.sectors;

export const countriesSelector = createSelector(getCountries, countries =>
  countries.data.map(country => ({
    value: country.wri_standard_name,
    label: country.wri_standard_name
  }))
);

export const sectorsSelector = createSelector(getSectors, sectors =>
  sectors.map(sector => ({ value: sector, label: sector }))
);
