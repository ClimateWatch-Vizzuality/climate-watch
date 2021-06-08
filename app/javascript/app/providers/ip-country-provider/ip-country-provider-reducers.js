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
  fetchIPCountryInit: state => setLoading(state, true),
  fetchIPCountryReady: (state, { payload }) =>
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
  fetchIPCountryFail: state => setError(state, true)
};
