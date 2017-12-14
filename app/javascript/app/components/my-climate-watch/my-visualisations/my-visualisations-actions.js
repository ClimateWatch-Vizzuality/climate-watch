import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

export const gotVisualisations = createAction('gotVisualisations');
export const openCreator = createAction('openCreator');
export const closeCreator = createAction('closeCreator');

export const fetchVisualisations = createThunkAction(
  'fetchVisualisations',
  () => dispatch => {
    fetch('/api/v1/my_cw/visualizations', {
      credentials: 'same-origin'
    })
      .then(d => d.json())
      .then(visualisations => dispatch(gotVisualisations(visualisations)));
  }
);
