import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEspScenariosInit = createAction('fetchEspScenariosInit');
const fetchEspScenariosReady = createAction('fetchEspScenariosReady');
const fetchEspScenariosFail = createAction('fetchEspScenariosFail');
const { ESP_API } = process.env;

const fetchEspScenarios = createThunkAction(
  'fetchEspScenarios',
  () => (dispatch, state) => {
    const { espScenarios } = state();
    if (
      espScenarios.data &&
      isEmpty(espScenarios.data) &&
      !espScenarios.loading
    ) {
      dispatch(fetchEspScenariosInit());
      fetch(`${ESP_API}/scenarios`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchEspScenariosReady(data));
          } else {
            dispatch(fetchEspScenariosReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchEspScenariosFail());
        });
    }
  }
);

export default {
  fetchEspScenarios,
  fetchEspScenariosInit,
  fetchEspScenariosReady,
  fetchEspScenariosFail
};
