export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchIndicatorsInit: state => setLoading(true, state),
  fetchIndicatorsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  fetchIndicatorsFail: state => setLoading(setError(state, true), false)
};
