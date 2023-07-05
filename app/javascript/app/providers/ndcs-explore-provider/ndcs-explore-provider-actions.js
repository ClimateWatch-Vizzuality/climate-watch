import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';
import uniqBy from 'lodash/uniqBy';
import { getFirstDocumentValue } from 'utils/indctransform';

const fetchNDCSExploreInit = createAction('fetchNDCSExploreInit');
const fetchNDCSExploreReady = createAction('fetchNDCSExploreReady');
const fetchNDCSExploreFail = createAction('fetchNDCSExploreFail');

const fetchNDCSExplore = createThunkAction(
  'fetchNDCSExplore',
  props => (dispatch, state) => {
    const { document } = props || {};
    const { ndcsExplore } = state();
    const params = [];
    const isDocumentSelected = document && document !== 'all';

    if (isDocumentSelected) {
      params.push(`document=${document}`);
    }

    const promises = [];
    if (ndcsExplore && !ndcsExplore.loading) {
      promises.push(
        apiWithCache.get(
          `/api/v1/ndcs?filter=map&source[]=Climate%20Watch&source[]=WB&source[]=NDC%20Explorer&source[]=UNICEF${
            params.length ? `&${params.join('&')}` : ''
          }`
        )
      );
    }

    // Used for indicators like ndce_ghg (emissions) that are needed but not included on category filtered calls
    // and as it is not filtered by category also serves the whole list of categories
    promises.push(
      apiWithCache.get(
        '/api/v1/ndcs?indicators=ndce_ghg,submission,submission_date'
      )
    );

    // Used for vulnerability indicator that is needed but not included on ndcs indicators
    promises.push(
      apiWithCache.get(
        '/api/v1/country_profile/indicators?indicator=vulnerability'
      )
    );

    dispatch(fetchNDCSExploreInit());
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
              response[0].data.indicators
                .concat(response[1].data.indicators)
                .concat(
                  (response[2] && response[2].data && response[2].data.data) ||
                    []
                ),
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
      .then(data => getFirstDocumentValue(data))
      .then(data => {
        dispatch(fetchNDCSExploreReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchNDCSExploreFail());
      });
  }
);

export default {
  fetchNDCSExplore,
  fetchNDCSExploreInit,
  fetchNDCSExploreReady,
  fetchNDCSExploreFail
};
