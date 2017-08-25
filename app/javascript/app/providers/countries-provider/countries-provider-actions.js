import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

import countriesData from 'app/data/countries.json';

const getCountriesInit = createAction('fetchNDCSInit');
const getCountriesReady = createAction('fetchNDCSReady');

const getCountries = createThunkAction(
  'getCountries',
  () => (dispatch, state) => {
    const { countries } = state();
    if (countries && isEmpty(countries.data)) {
      dispatch(getCountriesInit());

      setTimeout(() => {
        dispatch(getCountriesReady(countriesData));
      }, 200);
    }
  }
);

export default {
  getCountries,
  getCountriesInit,
  getCountriesReady
};
