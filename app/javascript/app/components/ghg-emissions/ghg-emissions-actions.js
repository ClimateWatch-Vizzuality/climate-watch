import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import qs from 'query-string';

const fetchGhgEmissionsInit = createAction('fetchGhgEmissionsInit');
const fetchGhgEmissionsFail = createAction('fetchGhgEmissionsFail');

const fetchGhgEmissionsMetaReady = createAction('fetchGhgEmissionsMetaReady');
const fetchGhgEmissionsMeta = createThunkAction(
  'fetchGhgEmissionsMeta',
  () => (dispatch, state) => {
    const { ghgEmissions } = state();
    if (ghgEmissions && isEmpty(ghgEmissions.meta)) {
      dispatch(fetchGhgEmissionsInit());
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
            dispatch(fetchGhgEmissionsMetaReady(dataParsed));
          } else {
            dispatch(fetchGhgEmissionsMetaReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGhgEmissionsFail());
        });
    }
  }
);

const fetchGhgEmissionsDataReady = createAction('fetchGhgEmissionsDataReady');
const fetchGhgEmissionsData = createThunkAction(
  'fetchGhgEmissionsData',
  filters => dispatch => {
    dispatch(fetchGhgEmissionsInit());
    fetch(`/api/v1/emissions?${qs.stringify(filters)}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchGhgEmissionsDataReady(data));
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchGhgEmissionsFail());
      });
  }
);

export default {
  fetchGhgEmissionsMeta,
  fetchGhgEmissionsInit,
  fetchGhgEmissionsMetaReady,
  fetchGhgEmissionsFail,
  fetchGhgEmissionsData,
  fetchGhgEmissionsDataReady
};
