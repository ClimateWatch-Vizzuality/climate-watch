import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';

export const gotMyViz = createAction('gotMyViz');

export const fetchMyViz = createThunkAction('fetchMyViz', () => dispatch => {
  fetch('/mocks/my-visualisations.json')
    .then(d => d.json())
    .then(d => dispatch(gotMyViz(d)));
});
