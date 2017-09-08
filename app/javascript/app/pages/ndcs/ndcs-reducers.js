export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: {}
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchNDCSInit: state => setLoading(state, true),
  fetchNDCSReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  fetchNDCSFail: state => setError(state, true)
};
