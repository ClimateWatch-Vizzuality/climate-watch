import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchEmissionsMetaInit = createAction('fetchEmissionsMetaInit');
const fetchEmissionsMetaReady = createAction('fetchEmissionsMetaReady');
const fetchEmissionsMetaFail = createAction('fetchEmissionsMetaFail');

const fetchEmissionsMeta = createThunkAction('fetchEmissionsMeta', () => (dispatch, state) => {
  const { ghgEmissionsMeta } = state();
  if (isEmpty(ghgEmissionsMeta.meta) && !ghgEmissionsMeta.loading) {
    dispatch(fetchEmissionsMetaInit());
    fetch('/api/v1/emissions/meta')
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          const dataParsed = {};
          Object.keys(data).forEach(key => {
            dataParsed[key] = data[key].map(item => {
              let newItem = {
                value: item.id,
                label: key === 'location' ? item.wri_standard_name.trim() : item.name.trim()
              };
              if (key === 'location') {
                newItem = {
                  ...newItem,
                  iso: item.iso_code3
                };
              }
              if (key === 'sector') {
                newItem = {
                  ...newItem,
                  aggregatedSectorIds: item.aggregated_sector_ids,
                  parentId: item.parent_id
                };
              }
              if (key === 'data_source') {
                newItem = {
                  name: item.name,
                  label: item.display_name,
                  value: item.id,
                  location: item.location_ids,
                  sector: item.sector_ids,
                  gas: item.gas_ids,
                  source: item.source
                };
              }
              return newItem;
            });
          }, this);
          dispatch(fetchEmissionsMetaReady(dataParsed));
        } else {
          dispatch(fetchEmissionsMetaReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchEmissionsMetaFail());
      });
  }
});

export default {
  fetchEmissionsMeta,
  fetchEmissionsMetaInit,
  fetchEmissionsMetaReady,
  fetchEmissionsMetaFail
};
