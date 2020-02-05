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
  fetchCompareAllInit: state => setLoading(state, true),
  fetchCompareAllReady: (state, { payload }) =>
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
  fetchCompareAllFail: state => setError(state, true)
};
