import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { apiWithCache } from 'services/api';

const fetchIndicatorsInit = createAction('fetchIndicatorsInit');
const fetchIndicatorsReady = createAction('fetchIndicatorsReady');
const fetchIndicatorsFail = createAction('fetchIndicatorsFail');

const fetchIndicators = createThunkAction(
  'fetchIndicators',
  ({ indicatorSlugs = [], locations = [] } = {}) => dispatch => {
    dispatch(fetchIndicatorsInit());

    const params = new URLSearchParams();
    if (indicatorSlugs?.length > 0) {
      params.append('indicator', indicatorSlugs.join(','));
    }
    if (locations?.length > 0) params.append('location', locations.join(','));
    const queryString =
      Array.from(params).length > 0 ? `?${params.toString()}` : '';
    apiWithCache
      .get(`/api/v1/country_profile/indicators${queryString}`)
      .then(response => {
        if (response) {
          const {
            data: { data }
          } = response;
          dispatch(fetchIndicatorsReady(data));
        } else {
          dispatch(fetchIndicatorsReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchIndicatorsFail());
      });
  }
);

export default {
  fetchIndicators,
  fetchIndicatorsInit,
  fetchIndicatorsReady,
  fetchIndicatorsFail
};
