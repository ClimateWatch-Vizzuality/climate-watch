export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchLatestUpdatesInit: state => setLoading(true, state),
  fetchLatestUpdatesReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, payload))
};
