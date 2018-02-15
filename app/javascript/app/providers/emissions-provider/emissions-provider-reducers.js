export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  getEmissionsInit: state => setLoading(true, state),
  getEmissionsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  getEmissionsFail: state => setError(state, true)
};
