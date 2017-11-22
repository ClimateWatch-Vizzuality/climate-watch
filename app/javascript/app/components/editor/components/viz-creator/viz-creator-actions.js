import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';

export const gotDatasets = createAction('gotDatasets');
export const gotLocations = createAction('gotLocations');
export const selectDataset = createAction('selectDataset');
export const selectViz = createAction('selectViz');
export const selectFilter = createAction('selectFilter');

// ENDPOINTS
// models: https://www.emissionspathways.org/api/v1/models :abbreviation
// models by country: https://www.emissionspathways.org/api/v1/models?country=:country_id: nos falta un queryparam para filtrar por country
// countries/regions: https://www.emissionspathways.org/api/v1/locations

export const fetchDatasets = createThunkAction(
  'fetchDatasets',
  () => dispatch => {
    fetch('/mocks/datasets.json')
      .then(d => d.json())
      .then(d => dispatch(gotDatasets(d)));
  }
);

export const fetchLocations = createThunkAction(
  'fetchLocations',
  () => dispatch => {
    fetch('https://www.emissionspathways.org/api/v1/locations')
      .then(d => d.json())
      .then(d => dispatch(gotLocations(d)));
  }
);
