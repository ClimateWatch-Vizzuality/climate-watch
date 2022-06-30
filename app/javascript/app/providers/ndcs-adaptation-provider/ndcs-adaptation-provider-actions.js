import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import qs from 'query-string';

const fetchNdcsAdaptationsInit = createAction('fetchNdcsAdaptationsInit');
const fetchNdcsAdaptationsReady = createAction('fetchNdcsAdaptationsReady');
const fetchNdcsAdaptationsFail = createAction('fetchNdcsAdaptationsFail');

const fetchNdcsAdaptations = createThunkAction(
  'fetchNdcsAdaptations',
  params => dispatch => {
    const queryParams = qs.stringify(params);
    dispatch(fetchNdcsAdaptationsInit());

    fetch(`/api/v1/ndcs/adaptation_actions?${queryParams}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch(fetchNdcsAdaptationsReady(data));
        } else {
          dispatch(fetchNdcsAdaptationsReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchNdcsAdaptationsFail());
      });
  }
);

export default {
  fetchNdcsAdaptationsInit,
  fetchNdcsAdaptations,
  fetchNdcsAdaptationsReady,
  fetchNdcsAdaptationsFail
};
