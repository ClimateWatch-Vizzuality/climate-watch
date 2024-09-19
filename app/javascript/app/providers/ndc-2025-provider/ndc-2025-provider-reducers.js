export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  getTimelineInit: state => setLoading(state, true),
  getTimelineReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true)
};
