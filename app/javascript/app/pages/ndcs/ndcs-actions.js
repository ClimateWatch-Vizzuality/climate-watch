import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSInit = createAction('fetchNDCSInit');
const fetchNDCSReady = createAction('fetchNDCSReady');
const fetchNDCSFail = createAction('fetchNDCSFail');

const fetchNDCS = createThunkAction('fetchNDCS', () => (dispatch, state) => {
  const { ndcs } = state();
  if (
    ndcs &&
    (isEmpty(ndcs.data) || isEmpty(ndcs.data.indicators)) &&
    !ndcs.loading
  ) {
    dispatch(fetchNDCSInit());
    fetch('/api/v1/ndcs?filter=map&source[]=CAIT&source[]=WB&source[]=NDC')
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => indcTransform(data))
      .then(data => {
        dispatch(fetchNDCSReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchNDCSFail());
      });
  }
});

export default {
  fetchNDCS,
  fetchNDCSInit,
  fetchNDCSReady,
  fetchNDCSFail
};
