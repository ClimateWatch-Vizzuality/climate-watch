export const initialState = {
  loading: false,
  loaded: false,
  data: [],
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchWorldMeatConsumptionInit: state => setLoading(true, state),
  fetchWorldMeatConsumptionReady: (state, { payload: { data, meta } }) =>
    setLoaded(true, setLoading(false, { ...state, data, meta })),
  fetchWorldMeatConsumptionFail: state =>
    setLoading(setError(state, true), false)
};
