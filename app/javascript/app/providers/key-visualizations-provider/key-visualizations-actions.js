import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getKeyVisualizationsInit = createAction('getKeyVisualizationsInit');
const getKeyVisualizationsFail = createAction('getKeyVisualizationsFail');
const getKeyVisualizationsReady = createAction('getKeyVisualizationsReady');
const getKeyVisualizations = createThunkAction(
  'getKeyVisualizations',
  () => dispatch => {
    dispatch(getKeyVisualizationsInit());

    fetch('/api/v1/key_visualizations')
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(response => {
        dispatch(getKeyVisualizationsReady(response.data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(getKeyVisualizationsFail());
      });
  }
);

export default {
  getKeyVisualizationsInit,
  getKeyVisualizationsFail,
  getKeyVisualizationsReady,
  getKeyVisualizations
};
