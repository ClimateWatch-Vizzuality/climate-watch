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
  fetchNDCSEnhancementsInit: state => setLoading(state, true),
  fetchNDCSEnhancementsReady: (state, { payload }) =>
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
  fetchNDCSEnhancementsFail: state => setError(state, true)
};
