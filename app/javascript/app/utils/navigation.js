import qs from 'query-string';

export function getLocationParamUpdated(
  location,
  { name, value, clear = false }
) {
  const search = qs.parse(location.search);
  const newSearch = clear
    ? { [name]: value }
    : {
      ...search,
      [name]: value
    };
  return {
    pathname: location.pathname,
    search: qs.stringify(newSearch)
  };
}

export default {
  getLocationParamUpdated
};
