import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { CWAPI } from 'services/api';

export const fetchVisualisationsInit = createAction('fetchVisualisationsInit');
export const fetchVisualisationsReady = createAction(
  'fetchVisualisationsReady'
);
export const fetchVisualisationsFail = createAction('fetchVisualisationsFail');

export const fetchMyVisualisations = createThunkAction(
  'fetchMyVisualisations',
  () => (dispatch, getState) => {
    const { visualisations } = getState();
    if (!visualisations.loading || !visualisations.error) {
      dispatch(fetchVisualisationsInit());
      CWAPI.get('my_cw/visualizations')
        .then(response => dispatch(fetchVisualisationsReady(response)))
        .catch(e => {
          console.warn(e);
          dispatch(fetchVisualisationsFail());
        });
    }
  }
);
