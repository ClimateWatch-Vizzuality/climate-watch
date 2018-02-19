import { createAction, createThunkAction } from 'redux-tools';
import { EPAPI, CWAPI } from 'services/api';

export const gotMyViz = createAction('gotMyViz');
export const gotMyVizFail = createAction('gotMyVizFail');

export const fetchMyViz = createThunkAction('fetchMyViz', () => dispatch => {
  CWAPI.get(`my_cw/visualizations`)
      .then(Visualisation => {
        dispatch(gotMyViz(Visualisation));
      })
      .catch(e => {
        console.warn(e);
        dispatch(gotMyVizFail());
      });
});
