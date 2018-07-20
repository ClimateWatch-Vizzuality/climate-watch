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
            categories: payload.categories,
            mapCategories: state.data.mapCategories || {},
            sectors: payload.sectors,
            mapIndicators: state.data.mapIndicators || [],
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
            categories: state.data.categories || {},
            mapCategories: payload.categories,
            sectors: payload.sectors,
            indicators: state.data.indicators || [],
            mapIndicators: payload.indicators
          }
        },
        false
      ),
      true
    ),
  fetchNDCSFail: state => setError(state, true)
};
