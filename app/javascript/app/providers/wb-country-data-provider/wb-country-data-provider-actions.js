import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchWbCountryDataInit = createAction('fetchWbCountryDataInit');
const fetchWbCountryDataReady = createAction('fetchWbCountryDataReady');
const fetchWbCountryDataFail = createAction('fetchWbCountryDataFail');

const fetchWbCountryData = createThunkAction(
  'fetchWbCountryData',
  () => (dispatch, state) => {
    const { wbCountryData } = state();
    if (
      wbCountryData.data &&
      isEmpty(wbCountryData.data) &&
      !wbCountryData.loading
    ) {
      dispatch(fetchWbCountryDataInit());
      fetch('/api/v1/wb_extra')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchWbCountryDataReady(data));
          } else {
            dispatch(fetchWbCountryDataReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchWbCountryDataFail());
        });
    }
  }
);

export default {
  fetchWbCountryData,
  fetchWbCountryDataInit,
  fetchWbCountryDataReady,
  fetchWbCountryDataFail
};
