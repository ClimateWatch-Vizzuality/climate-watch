export const initialState = {
  loading: false,
  loaded: false,
  meta: {},
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchEmissionsMetaInit: state => setLoading(true, state),
  fetchEmissionsMetaReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, meta: payload })),
  fetchEmissionsMetaFail: state => setLoading(setError(state, true), false)
};
