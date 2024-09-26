export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  getNdc2025TimelineInit: state => setLoading(state, true),
  getNdc2025TimelineReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true)
};
