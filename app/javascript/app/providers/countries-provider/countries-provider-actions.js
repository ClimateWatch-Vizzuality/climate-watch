import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getCountriesInit = createAction('getCountriesInit');
const getCountriesReady = createAction('getCountriesReady');

const getCountries = createThunkAction(
  'getCountries',
  () => (dispatch, state) => {
    const { countries } = state();
    if (countries && isEmpty(countries.data)) {
      dispatch(getCountriesInit());
      fetch('/api/v1/countries?topojson')
        .then((response) => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then((data) => {
          dispatch(getCountriesReady(data));
        })
        .catch((error) => {
          console.info(error);
        });
    }
  }
);

export default {
  getCountries,
  getCountriesInit,
  getCountriesReady
};
