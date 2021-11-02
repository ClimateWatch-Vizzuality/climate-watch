import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import { apiWithCache } from 'services/api';

const getCountriesInit = createAction('getCountriesInit');
const getCountriesReady = createAction('getCountriesReady');

const getCountries = createThunkAction(
  'getCountries',
  isSubnationalSource => (dispatch, state) => {
    const { countries } = state();
    if (countries && (isSubnationalSource || isEmpty(countries.data))) {
      dispatch(getCountriesInit());
      apiWithCache
        .get(
          `/api/v1/locations/countries${
            isSubnationalSource ? '?members=true' : ''
          }`
        )
        .then(data => {
          dispatch(getCountriesReady(data));
        })
        .catch(error => {
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
