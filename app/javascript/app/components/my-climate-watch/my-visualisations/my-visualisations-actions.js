import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

export const gotVisualisations = createAction('gotMyVisualisations');
export const openCreator = createAction('openCreator');
export const closeCreator = createAction('closeCreator');

export const fetchVisualisations = createThunkAction(
  'fetchMyVisualisations',
  () => dispatch => {
    CWAPI.get('my_cw/visualizations').then(visualisations =>
      dispatch(gotVisualisations(visualisations))
    );
  }
);
