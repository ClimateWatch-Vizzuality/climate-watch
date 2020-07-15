import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSInit = createAction('fetchNDCSInit');
const fetchNDCSReady = createAction('fetchNDCSReady');
const fetchNDCSFail = createAction('fetchNDCSFail');

const fetchNDCS = createThunkAction('fetchNDCS', props => (dispatch, state) => {
  const {
    overrideFilter,
    indicatorSlugs,
    subcategory,
    additionalIndicatorSlug,
    document
  } = props || {};
  const { ndcs } = state();
  const params = [];

  if (indicatorSlugs) {
    params.push(`indicators=${indicatorSlugs.join(',')}`);
  }
  if (!overrideFilter) {
    params.push('filter=map&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer');
  }
  if (subcategory) {
    params.push(`subcategory=${subcategory}`);
  }
  if (document) {
    params.push(`document=${document}`);
  }

  if (ndcs && !ndcs.loading) {
    dispatch(fetchNDCSInit());
    apiWithCache
      .get(`/api/v1/ndcs${params.length ? `?${params.join('&')}` : ''}`)
      .then(async response => {
        if (response.data) return response.data;
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

  // Used for indicators like ndce_ghg (emissions) that are needed but not included on category filtered calls
  if (
    additionalIndicatorSlug &&
    ndcs &&
    (!ndcs.data.indicators ||
      !Object.values(ndcs.data.indicators).find(
        i => i.slug === additionalIndicatorSlug
      ))
  ) {
    dispatch(fetchNDCSInit());
    apiWithCache
      .get(
        `/api/v1/ndcs?indicators=${additionalIndicatorSlug}${
          overrideFilter
            ? ''
            : '&filter=map&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer'
        }`
      )
      .then(response => {
        if (response.data) return response.data;
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
