import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';
import uniqBy from 'lodash/uniqBy';

/* @tmpfix: remove usage of indcTransform */
import indcTransform from 'utils/indctransform';

const fetchNDCSInit = createAction('fetchNDCSInit');
const fetchNDCSReady = createAction('fetchNDCSReady');
const fetchNDCSFail = createAction('fetchNDCSFail');

const fetchNDCS = createThunkAction('fetchNDCS', props => (dispatch, state) => {
  const { document } = props || {};
  const { ndcsExplore } = state();
  const params = [];

  if (document && document !== 'all') {
    params.push(`document=${document}`);
  }

  const promises = [];
  if (ndcsExplore && !ndcsExplore.loading) {
    promises.push(
      apiWithCache.get(
        `/api/v1/ndcs?filter=map&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer'${
          params.length ? `&${params.join('&')}` : ''
        }`
      )
    );
  }

  // Used for indicators like ndce_ghg (emissions) that are needed but not included on category filtered calls
  // and as it is not filtered by category also serves the whole list of categories
  promises.push(
    apiWithCache.get(
      '/api/v1/ndcs?indicators=ndce_ghg, submission, submission_date&filter=map&source[]=CAIT&source[]=WB&source[]=NDC%20Explorer'
    )
  );

  dispatch(fetchNDCSInit());
  Promise.all(promises)
    .then(async response => {
      if (response.length && response[0].data) {
        if (!response[1] || !response[1].data) {
          return response[0].data;
        }
        return {
          categories: {
            ...response[0].data.categories,
            ...response[1].data.categories
          },
          indicators: uniqBy(
            response[0].data.indicators.concat(response[1].data.indicators),
            'id'
          ),
          sectors: {
            ...response[0].data.sectors,
            ...response[1].data.sectors
          }
        };
      }
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
});

export default {
  fetchNDCS,
  fetchNDCSInit,
  fetchNDCSReady,
  fetchNDCSFail
};