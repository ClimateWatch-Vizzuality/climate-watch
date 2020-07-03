import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSInit = createAction('fetchNDCSInit');
const fetchNDCSReady = createAction('fetchNDCSReady');
const fetchNDCSFail = createAction('fetchNDCSFail');

const fetchNDCS = createThunkAction('fetchNDCS', props => (dispatch, state) => {
  const { overrideFilter, indicatorSlugs } = props || {};
  const { ndcs } = state();
  const indicatorsParam = indicatorSlugs
    ? `${overrideFilter ? '?' : '&'}&indicators=${indicatorSlugs.join(',')}`
    : '';
  if (ndcs && !ndcs.loading) {
    dispatch(fetchNDCSInit());
    fetch(
      `/api/v1/ndcs${
        overrideFilter
          ? ''
          : '?filter=map&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer'
      }${indicatorsParam}`
    )
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
