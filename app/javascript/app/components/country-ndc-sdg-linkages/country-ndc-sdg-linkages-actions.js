import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchNDCsSDGsInit = createAction('fetchNDCsSDGsInit');
const fetchNDCsSDGsReady = createAction('fetchNDCsSDGsReady');
const fetchNDCsSDGsFailed = createAction('fetchNDCsSDGsFailed');
const setTooltipData = createAction('setTooltipData');

const toogleNDCsSDGsInfo = createAction('toogleNDCsSDGsInfo');

const fetchNDCsSDGs = createThunkAction(
  'fetchNDCsSDGs',
  iso => (dispatch, state) => {
    dispatch(fetchNDCsSDGsInit());

    if (!state().countrySDGLinkages.data[iso]) {
      fetch(`/api/v1/ndcs/${iso}/sdgs`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchNDCsSDGsReady(data));
        })
        .catch(error => {
          dispatch(fetchNDCsSDGsFailed(iso));
          console.info(error);
        });
    }
  }
);

export default {
  fetchNDCsSDGs,
  fetchNDCsSDGsInit,
  fetchNDCsSDGsReady,
  fetchNDCsSDGsFailed,
  setTooltipData,
  toogleNDCsSDGsInfo
};
