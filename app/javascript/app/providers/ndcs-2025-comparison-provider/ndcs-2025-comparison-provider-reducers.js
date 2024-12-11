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
  fetch2025NDCComparisonInit: state => setLoading(state, true),
  // eslint-disable-next-line no-confusing-arrow
  fetch2025NDCComparisonReady: (state, { payload }) =>
    !payload
      ? null
      : setLoaded(setLoading({ data: payload.indicators }, false), true),
  fetch2025NDCComparisonFail: state => setError(state, true)
};
