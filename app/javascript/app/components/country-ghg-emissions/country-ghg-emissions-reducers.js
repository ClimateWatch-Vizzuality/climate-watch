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
  fetchCountryGhgEmissionsInit: state => setLoading(state, true),
  fetchCountryGhgEmissionsMetaReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, meta: payload }, false), true),
  fetchCountryGhgEmissionsDataReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  fetchCountryGhgEmissionsFail: state => setError(state, true)
};
