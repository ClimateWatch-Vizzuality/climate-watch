import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const { fetch } = window;

const fetchMeDataInit = createAction('fetchMeDataInit');
const fetchMeDataReady = createAction('fetchMeDataReady');

const fetchMeData = createThunkAction('fetchMeData', data => (dispatch) => {
  dispatch(fetchMeDataInit(data));

  fetch('https://google.com', { mode: 'no-cors' })
    .then(d => dispatch(fetchMeDataReady(d)));
});

export default {
  fetchMeData,
  fetchMeDataInit,
  fetchMeDataReady
};
