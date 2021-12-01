import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchIndicatorsInit = createAction('fetchIndicatorsInit');
const fetchIndicatorsReady = createAction('fetchIndicatorsReady');
const fetchIndicatorsFail = createAction('fetchIndicatorsFail');

const fetchIndicators = createThunkAction(
  'fetchIndicators',
  ({ indicatorSlugs = [], locations = [] } = {}) => (dispatch, state) => {
    const { countryProfileIndicators } = state();
    if (
      isEmpty(countryProfileIndicators.data) &&
      !countryProfileIndicators.loading
    ) {
      dispatch(fetchIndicatorsInit());

      const params = new URLSearchParams();
      if (indicatorSlugs?.length > 0) {
        params.append('indicator', indicatorSlugs.join(','));
      }
      if (locations?.length > 0) params.append('location', locations.join(','));
      const queryString =
        Array.from(params).length > 0 ? `?${params.toString()}` : '';

      fetch(`/api/v1/country_profile/indicators${queryString}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
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
  }
);

export default {
  fetchIndicators,
  fetchIndicatorsInit,
  fetchIndicatorsReady,
  fetchIndicatorsFail
};
