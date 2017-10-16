export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  meta: {},
  data: {}
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchGhgEmissionsInit: state => setLoading(state, true),
  fetchGhgEmissionsMetaReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, meta: payload }, false), true),
  fetchGhgEmissionsDataReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  fetchGhgEmissionsFail: state => setError(state, true)
};
