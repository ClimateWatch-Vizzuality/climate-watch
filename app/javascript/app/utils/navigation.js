import qs from 'query-string';
import isArray from 'lodash/isArray';

export function getLocationParamUpdated(location, params = [], clear = false) {
  const search = qs.parse(location.search);
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

export default {
  getLocationParamUpdated
};
