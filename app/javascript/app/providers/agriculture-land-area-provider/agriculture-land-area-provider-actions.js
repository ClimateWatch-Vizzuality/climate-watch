import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchAgricultureLandAreaInit = createAction(
  'fetchAgricultureLandAreaInit'
);
const fetchAgricultureLandAreaReady = createAction(
  'fetchAgricultureLandAreaReady'
);
const fetchAgricultureLandAreaFail = createAction(
  'fetchAgricultureLandAreaFail'
);

const BASE_URL = '/api/v1/data/agriculture_profile/areas';

const fetchAgricultureLandArea = createThunkAction(
  'fetchAgricultureLandArea',
  ({ country, year }) => (dispatch, state) => {
    const { agricultureLandArea } = state();
    const query = `?iso_code3=${country}&year=${year}`;
    if (country && year && !agricultureLandArea.loading) {
      dispatch(fetchAgricultureLandAreaInit());
      fetch(`${BASE_URL}${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            const d = data.data && data.data[0];
            const parsedData = { data: d, meta: data.meta };
            dispatch(fetchAgricultureLandAreaReady(parsedData));
          } else {
            dispatch(fetchAgricultureLandAreaReady([]));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchAgricultureLandAreaFail());
        });
    }
  }
);

export default {
  fetchAgricultureLandArea,
  fetchAgricultureLandAreaInit,
  fetchAgricultureLandAreaReady,
  fetchAgricultureLandAreaFail
};
