import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';

export function deburrUpper(string) {
  return toUpper(deburr(string));
}

export function isCountryIncluded(countriesIncluded = [], iso) {
  if (!countriesIncluded.length) return false;
  return countriesIncluded.includes(iso);
}

export default {
  deburrUpper,
  isCountryIncluded
};
