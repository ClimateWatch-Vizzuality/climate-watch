import { createSelector } from 'reselect';
import qs from 'query-string';

const getIsoCodeFromSearch = (state, props) =>
  (props && props.location && props.location.search) || null;

export default createSelector([getIsoCodeFromSearch], search => {
  if (!search) return 'WORLD';
  const { emissionsCountry } = search && qs.parse(search);
  return (emissionsCountry && emissionsCountry) || 'WORLD';
});
