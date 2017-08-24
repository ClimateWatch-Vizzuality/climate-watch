import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

import ndcsExampleData from 'app/data/ndcs.json';

const fetchNDCSInit = createAction('fetchNDCSInit');
const fetchNDCSReady = createAction('fetchNDCSReady');

const fetchNDCS = createThunkAction('fetchNDCS', () => (dispatch, state) => {
  const { ndcs } = state();
  if (ndcs && isEmpty(ndcs.data)) {
    dispatch(fetchNDCSInit());

    setTimeout(() => {
      dispatch(fetchNDCSReady(ndcsExampleData));
    }, 200);
  }
});

export default {
  fetchNDCS,
  fetchNDCSInit,
  fetchNDCSReady
};
