import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const findAvailableModelsInit = createAction('findAvailableModelsInit');
const findAvailableModelsReady = createAction('findAvailableModelsReady');
const findAvailableModelsFail = createAction('findAvailableModelsFail');
const { ESP_API } = process.env;

const findAvailableModels = createThunkAction(
  'findAvailableModels',
  locationId => dispatch => {
    dispatch(findAvailableModelsInit());
    fetch(`${ESP_API}/models?location=${locationId}&time_series=true`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch(findAvailableModelsReady(data.map(d => d.id)));
        } else {
          dispatch(findAvailableModelsReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(findAvailableModelsFail());
      });
  }
);

export default {
  findAvailableModels,
  findAvailableModelsInit,
  findAvailableModelsReady,
  findAvailableModelsFail
};
