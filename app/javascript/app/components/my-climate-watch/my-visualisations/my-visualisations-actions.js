import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const gotVisualisations = createAction('gotVisualisations');
export const openCreator = createAction('openCreator');
export const closeCreator = createAction('closeCreator');

export const fetchVisualisations = createThunkAction(
  'fetchVisualisations',
  () => dispatch => {
    CWAPI.get('my_cw/visualizations').then(visualisations =>
      dispatch(gotVisualisations(visualisations))
    );
  }
);
