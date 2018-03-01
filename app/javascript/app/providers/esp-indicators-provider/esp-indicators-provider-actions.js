import { createAction } from 'redux-actions';
import upperFirst from 'lodash/upperFirst';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEspIndicatorsInit = createAction('fetchEspIndicatorsInit');
const fetchEspIndicatorsReady = createAction('fetchEspIndicatorsReady');
const fetchEspIndicatorsFail = createAction('fetchEspIndicatorsFail');
const { ESP_API } = process.env;

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
      fetch(`${ESP_API}/indicators`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const dataParsed = data.map(d => ({
              ...d,
              name: upperFirst(d.name)
            }));
            dispatch(fetchEspIndicatorsReady(dataParsed));
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
