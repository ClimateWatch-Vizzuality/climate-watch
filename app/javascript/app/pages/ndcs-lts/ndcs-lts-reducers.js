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
  fetchNDCSLTSInit: state => setLoading(state, true),
  fetchNDCSLTSReady: (state, { payload }) =>
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
  fetchNDCSLTSFail: state => setError(state, true)
};
