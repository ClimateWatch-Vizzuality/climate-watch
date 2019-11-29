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
  fetchLTSInit: state => setLoading(state, true),
  fetchLTSReady: (state, { payload }) =>
    setLoaded(
      setLoading(
        {
          ...state,
          data: {
            ...state.data,
            ...payload
          }
        },
        false
      ),
      true
    ),
  fetchLTSFail: state => setError(state, true)
};
