import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const gotVisualisations = createAction('gotMyVisualisations');

export const fetchVisualisations = createThunkAction(
  'fetchMyVisualisations',
  () => dispatch => {
    CWAPI.get('my_cw/visualizations').then(visualisations =>
      dispatch(gotVisualisations(visualisations))
    );
  }
);
