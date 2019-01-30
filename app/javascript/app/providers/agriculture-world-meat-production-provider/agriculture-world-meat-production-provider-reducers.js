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
  fetchWorldMeatProductionInit: state => setLoading(true, state),
  fetchWorldMeatProductionReady: (state, { payload: { data, meta } }) =>
    setLoaded(true, setLoading(false, { ...state, data, meta })),
  fetchWorldMeatProductionFail: state =>
    setLoading(setError(state, true), false)
};
