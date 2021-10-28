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
  fetchPreviousNDCComparisonInit: state => setLoading(state, true),
  // eslint-disable-next-line no-confusing-arrow
  fetchPreviousNDCComparisonReady: (state, { payload }) =>
    !payload
      ? null
      : setLoaded(setLoading({ data: payload.indicators }, false), true),
  fetchPreviousNDCComparisonFail: state => setError(state, true)
};
