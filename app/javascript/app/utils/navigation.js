import qs from 'query-string';
import isArray from 'lodash/isArray';
import { CONTAINED_PATHNAME } from 'data/constants';

export const getSearch = location => qs.parse(location.search);

export function getLocationParamUpdated(location, params = [], clear = false) {
  const search = getSearch(location);
  const newFilters = {};
  const paramsArray = isArray(params) ? params : [params];
  paramsArray.forEach(param => {
    newFilters[param.name] = param.value;
  });
  const newSearch = clear
    ? { ...newFilters }
    : {
      ...search,
      ...newFilters
    };
  return {
    pathname: location.pathname,
    search: qs.stringify(newSearch),
    hash: location.hash
  };
}

export function updateUrlHash(location, newHash) {
  return {
    ...location,
    hash: newHash
  };
}

export const isPageContained =
  window.location.pathname.split('/')[1] === CONTAINED_PATHNAME;

export const isPageNdcp = location => {
  const search = qs.parse(location.search);
  return search && search.isNdcp && search.isNdcp === 'true';
};

export const isEmbededComponent = location =>
  location.pathname.includes('/embed');

export default {
  getSearch,
  getLocationParamUpdated,
  updateUrlHash,
  isPageContained,
  isPageNdcp,
  isEmbededComponent
};
