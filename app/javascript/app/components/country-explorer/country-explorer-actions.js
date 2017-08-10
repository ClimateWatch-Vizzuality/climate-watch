import { createAction } from 'redux-actions';

const openCountryExplorer = createAction('openCountryExplorer');
const closeCountryExplorer = createAction('closeCountryExplorer');
const toggleCountryExplorer = createAction('toggleCountryExplorer');

export default {
  openCountryExplorer,
  closeCountryExplorer,
  toggleCountryExplorer
};
