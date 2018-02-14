export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  meta: {},
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  getEmissionsInit: state => setLoading(true, state),
  getEmissionsReady: (state, { payload }) =>
    setLoaded(setLoading(false, { ...state, data: payload }), true),
  getEmissionsFail: state => setError(state, true)
};
