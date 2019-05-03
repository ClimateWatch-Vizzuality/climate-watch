import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { CWAPI } from 'services/api';

export const fetchVisualisationInit = createAction('fetchVisualisationInit');
export const fetchVisualisationReady = createAction('fetchVisualisationReady');
export const fetchVisualisationFail = createAction('fetchVisualisationFail');

export const fetchVisualisation = createThunkAction(
  'fetchVisualisation',
  id => (dispatch, getState) => {
    const { visualisations } = getState();
    if (!visualisations.loading || !visualisations.error) {
      dispatch(fetchVisualisationInit());
      CWAPI.get(`my_cw/visualizations/${id}`)
        .then(response => dispatch(fetchVisualisationReady(response)))
        .catch(e => {
          console.warn(e);
          dispatch(fetchVisualisationFail());
        });
    }
  }
);
