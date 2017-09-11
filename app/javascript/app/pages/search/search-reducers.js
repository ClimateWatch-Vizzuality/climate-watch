export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: []
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchSearchResultsInit: state => setLoading(state, true),
  fetchSearchResultsReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  fetchSearchResultsFail: state => setError(state, true)
};
