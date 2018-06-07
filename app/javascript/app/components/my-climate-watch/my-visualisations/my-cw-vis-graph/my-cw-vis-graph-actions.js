import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const fetchVisualisationsInit = createAction('fetchVisualisationsInit');
export const fetchVisualisationReady = createAction('fetchVisualisationReady');
export const fetchVisualisationFail = createAction('fetchVisualisationFail');

export const fetchVisualisation = createThunkAction(
  'fetchVisualisation',
  id => (dispatch, getState) => {
    const { visualisations } = getState();
    if (!visualisations.loading || !visualisations.error) {
      dispatch(fetchVisualisationsInit());
      CWAPI.get(`my_cw/visualizations/${id}`)
        .then(response => dispatch(fetchVisualisationReady(response)))
        .catch(e => {
          console.warn(e);
          dispatch(fetchVisualisationFail());
        });
    }
  }
);
