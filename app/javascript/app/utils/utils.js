import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';

export function deburrUpper(string) {
  return toUpper(deburr(string));
}

export function isCountryDisabled(iso) {
  return iso === 'ESH'; // We want to show western sahara in the map but not interact with it for now
}

export default {
  deburrUpper,
  isCountryDisabled
};
