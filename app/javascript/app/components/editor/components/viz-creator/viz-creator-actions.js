import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';

export const gotDatasets = createAction('gotDatasets');
export const selectDataset = createAction('selectDataset');
export const selectViz = createAction('selectViz');

export const fetchDatasets = createThunkAction(
  'fetchDatasets',
  () => dispatch => {
    fetch('/mocks/datasets.json')
      .then(d => d.json())
      .then(d => dispatch(gotDatasets(d)));
  }
);
