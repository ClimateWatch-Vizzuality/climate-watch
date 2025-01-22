export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  getCountryEmissionsInit: state => setLoading(state, true),
  getCountryEmissionsReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  getCountryEmissionsFail: state => setError(state, true)
};
