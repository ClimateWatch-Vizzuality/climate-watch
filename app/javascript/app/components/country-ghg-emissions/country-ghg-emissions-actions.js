import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import qs from 'query-string';

const fetchCountryGhgEmissionsInit = createAction(
  'fetchCountryGhgEmissionsInit'
);
const fetchCountryGhgEmissionsFail = createAction(
  'fetchCountryGhgEmissionsFail'
);

const fetchCountryGhgEmissionsMetaReady = createAction(
  'fetchCountryGhgEmissionsMetaReady'
);
const fetchCountryGhgEmissionsMeta = createThunkAction(
  'fetchCountryGhgEmissionsMeta',
  () => (dispatch, state) => {
    const { countryGhgEmissions } = state();
    if (countryGhgEmissions && isEmpty(countryGhgEmissions.meta)) {
      dispatch(fetchCountryGhgEmissionsInit());
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
            dispatch(fetchCountryGhgEmissionsMetaReady(dataParsed));
          } else {
            dispatch(fetchCountryGhgEmissionsMetaReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchCountryGhgEmissionsFail());
        });
    }
  }
);

const fetchCountryGhgEmissionsDataReady = createAction(
  'fetchCountryGhgEmissionsDataReady'
);
const fetchCountryGhgEmissionsData = createThunkAction(
  'fetchCountryGhgEmissionsData',
  filters => dispatch => {
    dispatch(fetchCountryGhgEmissionsInit());
    fetch(`/api/v1/emissions?${qs.stringify(filters)}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCountryGhgEmissionsDataReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchCountryGhgEmissionsFail());
      });
  }
);

export default {
  fetchCountryGhgEmissionsMeta,
  fetchCountryGhgEmissionsInit,
  fetchCountryGhgEmissionsMetaReady,
  fetchCountryGhgEmissionsFail,
  fetchCountryGhgEmissionsData,
  fetchCountryGhgEmissionsDataReady
};
