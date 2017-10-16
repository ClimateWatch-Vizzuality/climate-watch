import { createAction } from 'redux-actions';

const setMapZoom = createAction('setMapZoom');
const setMapCenter = createAction('setMapCenter');
const setMapParams = createAction('setMapParams');

export default {
  setMapZoom,
  setMapCenter,
  setMapParams
};
