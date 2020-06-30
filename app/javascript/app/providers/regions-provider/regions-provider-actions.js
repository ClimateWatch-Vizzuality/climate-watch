import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getRegionsInit = createAction('getRegionsInit');
const getRegionsReady = createAction('getRegionsReady');

const getRegions = createThunkAction(
  'getRegions',
  includeGHGSources => (dispatch, state) => {
    const { regions } = state();
    if (regions && isEmpty(regions.data)) {
      dispatch(getRegionsInit());
      fetch(
        `/api/v1/locations/regions${
          includeGHGSources ? '?ghg_sources=true' : ''
        }`
      )
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getRegionsReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getRegions,
  getRegionsInit,
  getRegionsReady
};
