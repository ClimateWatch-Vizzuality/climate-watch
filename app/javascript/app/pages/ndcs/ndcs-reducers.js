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
    setLoaded(
      setLoading(
        {
          ...state,
          data: {
            ...state.data,
            sectors: payload.sectors,
            categories: payload.categories,
            indicators: payload.indicators
          }
        },
        false
      ),
      true
    ),
  fetchNDCSMapIndicatorsReady: (state, { payload }) =>
    setLoaded(
      setLoading(
        {
          ...state,
          data: {
            ...state.data,
            sectors: payload.sectors,
            mapCategories: payload.categories,
            mapIndicators: payload.indicators
          }
        },
        false
      ),
      true
    ),
  fetchNDCSFail: state => setError(state, true)
};
