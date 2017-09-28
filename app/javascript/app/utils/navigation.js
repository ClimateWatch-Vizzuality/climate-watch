import qs from 'query-string';

export function getLocationParamUpdated(location, params, clear) {
  const search = qs.parse(location.search);
  const newFilters = {};
  params.forEach(param => {
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
    search: qs.stringify(newSearch)
  };
}

export default {
  getLocationParamUpdated
};
