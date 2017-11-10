import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEspIndicatorsInit = createAction('fetchEspIndicatorsInit');
const fetchEspIndicatorsReady = createAction('fetchEspIndicatorsReady');
const fetchEspIndicatorsFail = createAction('fetchEspIndicatorsFail');

const fetchEspIndicators = createThunkAction(
  'fetchEspIndicators',
  () => (dispatch, state) => {
    const { espIndicators } = state();
    if (
      espIndicators.data &&
      isEmpty(espIndicators.data) &&
      !espIndicators.loading
    ) {
      dispatch(fetchEspIndicatorsInit());
      fetch('https://emissionspathways.org/api/v1/indicators')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchEspIndicatorsReady(data));
          } else {
            dispatch(fetchEspIndicatorsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchEspIndicatorsFail());
        });
    }
  }
);

export default {
  fetchEspIndicators,
  fetchEspIndicatorsInit,
  fetchEspIndicatorsReady,
  fetchEspIndicatorsFail
};
