import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';

const fetchEmissionsMetaInit = createAction('fetchEmissionsMetaInit');
const fetchEmissionsMetaReady = createAction('fetchEmissionsMetaReady');
const fetchEmissionsMetaFail = createAction('fetchEmissionsMetaFail');

const fetchEmissionsMeta = createThunkAction(
  'fetchEmissionsMeta',
  () => (dispatch, state) => {
    const { countryGhgEmissions } = state();
    if (countryGhgEmissions && isEmpty(countryGhgEmissions.meta)) {
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
                  label:
                    key === 'location'
                      ? item.wri_standard_name
                      : upperFirst(item.name)
                };
                if (key === 'location') {
                  newItem = {
                    ...newItem,
                    iso: item.iso_code3
                  };
                }
                if (key === 'data_source') {
                  newItem = {
                    ...newItem,
                    location: item.location_ids,
                    sector: item.sector_ids,
                    gas: item.gas_ids,
                    gwp: item.gwp_ids
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
  }
);

export default {
  fetchEmissionsMeta,
  fetchEmissionsMetaInit,
  fetchEmissionsMetaReady,
  fetchEmissionsMetaFail
};
