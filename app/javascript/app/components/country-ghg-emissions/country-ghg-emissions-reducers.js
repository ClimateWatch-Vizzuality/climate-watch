export const initialState = {
  loading: true,
  loaded: false,
  error: false,
  data: []
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchCountryGhgEmissionsInit: state => setLoading(state, true),
  fetchCountryGhgEmissionsDataReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, ...payload }, false), true),
  fetchCountryGhgEmissionsFail: state => setError(state, true)
};
