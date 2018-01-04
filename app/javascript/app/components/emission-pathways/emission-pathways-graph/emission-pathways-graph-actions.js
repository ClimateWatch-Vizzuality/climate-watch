import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const findAvailableModelsInit = createAction('findAvailableModelsInit');
const findAvailableModelsReady = createAction('findAvailableModelsReady');
const findAvailableModelsFail = createAction('findAvailableModelsFail');
const { ESP_API } = process.env;

const findAvailableModels = createThunkAction(
  'findAvailableModels',
  locationId => (dispatch, state) => {
    const { espGraph } = state();
    if (isEmpty(espGraph.locations) || !espGraph.locations[locationId]) {
      dispatch(findAvailableModelsInit());
      fetch(`${ESP_API}/models?location=${locationId}&time_series=true`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(
              findAvailableModelsReady({
                locationId,
                modelIds: data.map(d => d.id)
              })
            );
          } else {
            dispatch(findAvailableModelsReady({ locationId, modelIds: {} }));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(findAvailableModelsFail());
        });
    }
  }
);

export default {
  findAvailableModels,
  findAvailableModelsInit,
  findAvailableModelsReady,
  findAvailableModelsFail
};
