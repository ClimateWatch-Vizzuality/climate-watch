import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEspModelsInit = createAction('fetchEspModelsInit');
const fetchEspModelsReady = createAction('fetchEspModelsReady');
const fetchEspModelsFail = createAction('fetchEspModelsFail');

const fetchEspModels = createThunkAction(
  'fetchEspModels',
  () => (dispatch, state) => {
    const { espModels } = state();
    if (espModels.data && isEmpty(espModels.data) && !espModels.loading) {
      dispatch(fetchEspModelsInit());
      fetch('https://emissionspathways.org/api/v1/models')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchEspModelsReady(data));
          } else {
            dispatch(fetchEspModelsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchEspModelsFail());
        });
    }
  }
);

export default {
  fetchEspModels,
  fetchEspModelsInit,
  fetchEspModelsReady,
  fetchEspModelsFail
};
