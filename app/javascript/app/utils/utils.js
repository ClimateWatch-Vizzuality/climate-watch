import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFinite from 'lodash/isFinite';
import startCase from 'lodash/startCase';

export const assign = (o, ...rest) => Object.assign({}, o, ...rest);

export const deburrUpper = string => toUpper(deburr(string));
export const toStartCase = string => {
  const parsedString = startCase(string);
  return parsedString.indexOf('Co 2') === -1
    ? parsedString
    : parsedString.replace(/Co 2/g, 'CO2');
};

export const lowerUpperFirst = string => upperFirst(toLower(string));

export const isCountryIncluded = (countriesIncluded = [], iso) => {
  if (!countriesIncluded.length) return false;
  return countriesIncluded.includes(iso);
};

export const compareIndexByKey = attribute =>
  function compareIndex(a, b) {
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

export function importAllImagesFromFolder(r) {
  const images = {};
  const keys = r.keys();
  if (keys.length) {
    keys.forEach(item => {
      images[
        item
          .replace('./', '')
          .replace('.jpeg', '')
          .replace('.jpg', '')
          .replace('.png', '')
      ] = r(item);
    });
  }
  return images;
}

export const truncateDecimals = (number, decimalPlaces) =>
  number.toFixed(decimalPlaces) / 1;

const r2lWrittedLanguages = ['AR'];
export function isR2LWrittedLanguage(lang) {
  return r2lWrittedLanguages.indexOf(lang) > -1;
}

export const sanitize = data => {
  if (isArray(data)) {
    return data.join(', ');
  }
  if (data && !isString(data)) {
    if (isFinite(data)) return data.toString();
    return data.name || data.full_name || '';
  }
  return data;
};

export const sanitizeUrl = url =>
  (url.startsWith('http') ? url : `http://${url}`);

export const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r} ,${g} ,${b},${opacity})`;
};

// Detects if user browser is Edge or Explorer 11
export const isMicrosoftBrowser = () => {
  const ua = navigator.userAgent;
  return ua.indexOf('Edge') !== -1 || ua.indexOf('Trident/') !== -1;
};

export default {
  compareIndexByKey,
  deburrUpper,
  isCountryIncluded,
  importAllImagesFromFolder,
  truncateDecimals,
  isMicrosoftBrowser,
  toStartCase
};
