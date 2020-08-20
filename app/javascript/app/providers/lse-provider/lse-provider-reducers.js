export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchLSEInit: state => setLoading(state, true),
  fetchLSEReady: (state, { payload }) =>
    setLoaded(
      setLoading(
        {
          ...state,
          data: payload
        },
        false
      ),
      true
    ),
  fetchLSEFail: state => setError(state, true)
};
