import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import qs from 'query-string';

const getEmissionsInit = createAction('getEmissionsInit');
const getEmissionsFail = createAction('getEmissionsFail');
const getEmissionsReady = createAction('getEmissionsReady');
const getEmissions = createThunkAction('getEmissions', filters => dispatch => {
  if (filters) {
    dispatch(getEmissionsInit());
    fetch(`/api/v1/emissions?${qs.stringify(filters)}`)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        const parsedData = data.map(d => ({
          ...d,
          gas: d.gas.trim(),
          sector: d.sector.trim(),
          location: d.location.trim()
        }));
        dispatch(getEmissionsReady(parsedData));
      })
      .catch(error => {
        console.warn(error);
        dispatch(getEmissionsFail());
      });
  }
});

export default {
  getEmissionsInit,
  getEmissionsFail,
  getEmissions,
  getEmissionsReady
};
