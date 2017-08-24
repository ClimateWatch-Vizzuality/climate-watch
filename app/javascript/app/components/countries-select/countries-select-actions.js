import { createAction } from 'redux-actions';

const countryPreSelect = createAction('countryPreSelect');
const countrySelectFilter = createAction('countrySelectFilter');

export default {
  countryPreSelect,
  countrySelectFilter
};
