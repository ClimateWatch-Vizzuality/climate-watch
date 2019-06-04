import { AGRICULTURE_TOTAL_EMISSIONS } from 'data/constants';

export const initialState = {
  loading: false,
  loaded: false,
  data: [],
  error: false
};

const transformData = (data) => (
  data.map(d => {
    if (d.emission_subcategory.short_name === AGRICULTURE_TOTAL_EMISSIONS.short_name) {
      const emission_subcategory = {
        ...d.emission_subcategory,
        ...AGRICULTURE_TOTAL_EMISSIONS
      };
      return { ...d, emission_subcategory };
    }
    return d;
  })
);

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchAgricultureEmissionsInit: state => setLoading(true, state),
  fetchAgricultureEmissionsReady: (state, { payload: { data } }) =>
    setLoaded(true, setLoading(false, { ...state, data: transformData(data) })),
  fetchAgricultureEmissionsFail: state =>
    setLoading(setError(state, true), false)
};
