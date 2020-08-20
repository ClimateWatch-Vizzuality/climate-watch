/* eslint-disable no-useless-escape */
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFinite from 'lodash/isFinite';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';

export const assign = (o, ...rest) => Object.assign({}, o, ...rest);

export const deburrUpper = string => toUpper(deburr(string));
export const deburrCapitalize = string =>
  replaceLowDash(replaceAcronyms(capitalize(deburr(string))));
export const toStartCase = string => {
  const parsedString = startCase(string);
  return replaceAcronyms(parsedString);
};
const replaceLowDash = string => replaceAll(string, { _: ' ' });
const replaceAcronyms = string => {
  const replacements = {
    'Ndc Sdg': 'NDC-SDG',
    Ndc: 'NDC',
    Indc: 'INDC',
    Sdg: 'SDG',
    Lts: 'LTS',
    'Co 2': 'CO2'
  };
  return replaceAll(string, replacements);
};

export const isANumber = i => !isNaN(parseInt(i, 10));

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

// Detects if user browser is Edge or Explorer 11
export const isMicrosoftBrowser = () => {
  const ua = navigator.userAgent;
  return ua.indexOf('Edge') !== -1 || isInternetExplorer();
};

// Detects if user browser is Explorer 11
export const isInternetExplorer = () =>
  navigator.userAgent.indexOf('Trident/') !== -1;
// Detects if user browser is Safari
export const isSafariBrowser = () =>
  navigator.userAgent.indexOf('Safari/') !== -1 &&
  navigator.userAgent.indexOf('Chrome/') === -1;

// Splits the long_string into an array of strings
export const wordWrap = (long_string, max_char) => {
  const sum_length_of_words = function (word_array) {
    let out = 0;
    if (word_array.length !== 0) {
      for (let i = 0; i < word_array.length; i++) {
        const word = word_array[i];
        out += word.length;
      }
    }
    return out;
  };
  let split_out = [[]];
  const split_string = long_string.split(' ');
  for (let i = 0; i < split_string.length; i++) {
    const word = split_string[i];

    if (
      sum_length_of_words(split_out[split_out.length - 1]) + word.length >
      max_char
    ) {
      split_out = split_out.concat([[]]);
    }

    split_out[split_out.length - 1] = split_out[split_out.length - 1].concat(
      word
    );
  }

  for (let i = 0; i < split_out.length; i++) {
    split_out[i] = split_out[i].join(' ');
  }

  return split_out;
};

const unquote = value => {
  if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
    return value.substring(1, value.length - 1);
  }
  return value;
};

export const parseLinkHeader = header => {
  // eslint-disable-next-line no-useless-escape
  const linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
  const paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g; // eslint-disable-line no-useless-escape

  const matches = header.match(linkexp);
  const rels = {};
  for (let i = 0; i < matches.length; i++) {
    const split = matches[i].split('>');
    const href = split[0].substring(1);
    const ps = split[1];
    const link = {};
    link.href = href;
    const s = ps.match(paramexp);
    for (let j = 0; j < s.length; j++) {
      const p = s[j];
      const paramsplit = p.split('=');
      const name = paramsplit[0];
      link[name] = unquote(paramsplit[1]);
    }
    if (link.rel !== undefined) {
      rels[link.rel] = link;
    }
  }
  return rels;
};

export const replaceAll = (text, replacements) => {
  let updatedText = text;
  Object.keys(replacements).forEach(x => {
    updatedText = updatedText.replace(new RegExp(x, 'g'), replacements[x]);
  });
  return updatedText;
};

export const findEqual = (parent, children, value) =>
  children.find(c => parent[c] === value);

export function noEmptyValues(object) {
  const noEmptyResult = {};
  Object.keys(object).forEach(key => {
    if (object[key] && !(isArray(object[key]) && object[key].length === 0)) {
      noEmptyResult[key] = object[key];
    }
  });
  return noEmptyResult;
}

export const arrayToSentence = arr => {
  const sentence =
    arr.length > 1 ? `${arr.slice(0, arr.length - 1).join(', ')}, and ` : '';
  return `${sentence}${arr.slice(-1)}`;
};

export function precentageTwoPlacesRound(percentage) {
  if (!percentage) return null;
  return Math.round(percentage * 10) / 10;
}

export function orderByColumns(columnOrder) {
  const indexOf = col =>
    (columnOrder.indexOf(col) > -1 ? columnOrder.indexOf(col) : Infinity);
  return (a, b) => indexOf(a) - indexOf(b);
}

export function stripHTML(text) {
  return text.replace(/<(?:.|\n)*?>/gm, '');
}

// exceptions: Array of columns to avoid
// objectValueKeys: { ColumnName: keyToFilterIn, ... }
export function filterQuery(data, query, exceptions, objectValueKeys) {
  return data.filter(d => {
    let match = false;
    const keys = exceptions
      ? Object.keys(d).filter(k => !exceptions.includes(k))
      : Object.keys(d);
    keys.forEach(col => {
      const matchesWithObjectValue =
        objectValueKeys &&
        objectValueKeys[col] &&
        deburrUpper(d[col][objectValueKeys[col]]).indexOf(deburrUpper(query)) >
          -1;
      const matchesWithValue =
        deburrUpper(d[col]).indexOf(deburrUpper(query)) > -1;
      if (matchesWithObjectValue || matchesWithValue) {
        match = true;
      }
    });
    return match;
  });
}

export const useSlug = string => {
  const from = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const to = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
  const regex = new RegExp(from.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(regex, character => to.charAt(from.indexOf(character)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const isIE = () =>
  !!window.MSInputMethodContext && !!document.documentMode;

export default {
  arrayToSentence,
  compareIndexByKey,
  deburrUpper,
  findEqual,
  importAllImagesFromFolder,
  isANumber,
  isCountryIncluded,
  isMicrosoftBrowser,
  noEmptyValues,
  orderByColumns,
  parseLinkHeader,
  precentageTwoPlacesRound,
  replaceAll,
  stripHTML,
  toStartCase,
  truncateDecimals,
  wordWrap
};
