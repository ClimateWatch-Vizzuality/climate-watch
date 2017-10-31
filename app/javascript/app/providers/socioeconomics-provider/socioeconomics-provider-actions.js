import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchSocioeconomicsInit = createAction('fetchSocioeconomicsInit');
const fetchSocioeconomicsReady = createAction('fetchSocioeconomicsReady');
const fetchSocioeconomicsFail = createAction('fetchSocioeconomicsFail');

const fetchSocioeconomics = createThunkAction(
  'fetchSocioeconomics',
  iso => (dispatch, state) => {
    const { wbCountryData } = state();
    if (
      wbCountryData.data &&
      isEmpty(wbCountryData.data[iso]) &&
      !wbCountryData.loading
    ) {
      dispatch(fetchSocioeconomicsInit());
      fetch(`/api/v1/socioeconomics/${iso}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchSocioeconomicsReady({ [iso]: data }));
          } else {
            dispatch(fetchSocioeconomicsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchSocioeconomicsFail());
        });
    }
  }
);

export default {
  fetchSocioeconomics,
  fetchSocioeconomicsInit,
  fetchSocioeconomicsReady,
  fetchSocioeconomicsFail
};
