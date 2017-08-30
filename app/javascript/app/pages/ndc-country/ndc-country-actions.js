import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import exampleNDC from 'app/data/ndc-country.json';

const fetchCountryNDCInit = createAction('fetchCountryNDCInit');
const fetchCountryNDCReady = createAction('fetchCountryNDCReady');

const fetchCountryNDC = createThunkAction(
  'fetchCountryNDC',
  iso => (dispatch) => {
    dispatch(fetchCountryNDCInit());

    setTimeout(() => {
      dispatch(
        fetchCountryNDCReady({
          [iso]: exampleNDC
        })
      );
    }, 1000);
  }
);

export default {
  fetchCountryNDC,
  fetchCountryNDCInit,
  fetchCountryNDCReady
};
