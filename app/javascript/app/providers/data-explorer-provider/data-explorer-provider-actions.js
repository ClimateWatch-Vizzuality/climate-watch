import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

export const fetchDataExplorerInit = createAction('fetchDataExplorerInit');
export const fetchDataExplorerReady = createAction('fetchDataExplorerReady');
export const fetchDataExplorerFail = createAction('fetchDataExplorerFail');

const SECTION_NAMES = {
  'historical-emissions': 'historical_emissions',
  'ndc-sdg-linkages': 'ndc_sdg',
  'emission-pathways': 'emission_pathways'
};
export const fetchDataExplorer = createThunkAction(
  'fetchDataExplorer',
  section => dispatch => {
    dispatch(fetchDataExplorerInit());
    fetch(`/api/v1/data/${SECTION_NAMES[section]}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch(fetchDataExplorerReady({ data, section }));
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
