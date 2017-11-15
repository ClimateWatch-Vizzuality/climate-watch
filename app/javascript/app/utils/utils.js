import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';

export function deburrUpper(string) {
  return toUpper(deburr(string));
}

export function isCountryIncluded(countriesIncluded = [], iso) {
  if (!countriesIncluded.length) return false;
  return countriesIncluded.includes(iso);
}

export function compareIndexByKey(attribute) {
  return function compareIndex(a, b) {
    const divideByDot = /(.*)\.(.*)/;
    const isNotNumber = /[^0-9.]/;
    const match = x => x[attribute].match(divideByDot);
    const fullNumber = x =>
      (match(x) && match(x)[1]) || x[attribute].match(divideByDot);
    const decimalNumber = x => match(x) && match(x)[2];
    const fullA = fullNumber(a);
    const fullB = fullNumber(b);
    const decimalA = decimalNumber(a);
    const decimalB = decimalNumber(b);
    if (!match(a) || !match(b)) {
      return a[attribute] > b[attribute] ? 1 : -1;
    }
    if (!decimalA || !decimalB || parseInt(fullA, 10) !== parseInt(fullB, 10)) {
      return parseInt(fullA, 10) - parseInt(fullB, 10);
    }
    if (decimalA.match(isNotNumber) || decimalB.match(isNotNumber)) {
      return decimalA > decimalB ? 1 : -1;
    }
    return parseInt(decimalA, 10) - parseInt(decimalB, 10);
  };
}

export function importAllImagesFromFolder(r) {
  const images = {};
  const keys = r.keys();
  if (keys.length) {
    keys.forEach(item => {
      images[item.replace('./', '').replace('.jpg', '')] = r(item);
    });
  }
  return images;
}

export default {
  compareIndexByKey,
  deburrUpper,
  isCountryIncluded
};
