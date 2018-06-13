import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

export const fetchDataExplorerInit = createAction('fetchDataExplorerInit');
export const fetchDataExplorerReady = createAction('fetchDataExplorerReady');
export const fetchDataExplorerFail = createAction('fetchDataExplorerFail');

export const fetchDataExplorer = createThunkAction(
  'fetchDataExplorer',
  () => dispatch => {
    dispatch(fetchDataExplorerInit());
    fetch('/api/v1/data/historical_emissions')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch(fetchDataExplorerReady(data));
        } else {
          dispatch(fetchDataExplorerReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchDataExplorerFail());
      });
  }
);

export default {
  fetchDataExplorer,
  fetchDataExplorerInit,
  fetchDataExplorerReady,
  fetchDataExplorerFail
};
