import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEspModelsInit = createAction('fetchEspModelsInit');
const fetchEspModelsReady = createAction('fetchEspModelsReady');
const fetchEspModelsFail = createAction('fetchEspModelsFail');
const { ESP_API } = process.env;

const fetchEspModels = createThunkAction(
  'fetchEspModels',
  () => (dispatch, state) => {
    const { espModels } = state();
    if (espModels.data && isEmpty(espModels.data) && !espModels.loading) {
      dispatch(fetchEspModelsInit());
      fetch(`${ESP_API}/models`)
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
