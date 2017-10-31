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
  getTimelineInit: state => setLoading(true, state),
  getTimelineReady: (state, { payload }) =>
    setLoaded(
      true,
      setLoading(false, { ...state, data: Object.assign(state.data, payload) })
    ),
  getTimelineFail: state => setLoading(setError(state, true), false)
};
