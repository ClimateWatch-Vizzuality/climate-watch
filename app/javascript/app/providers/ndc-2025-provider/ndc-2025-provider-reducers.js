export const initialState = {
  loading: false,
  loaded: false,
  data: [],
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  get2025NdcTrackerInit: state => setLoading(true, state),
  get2025NdcTrackerReady: (state, { payload }) =>
    setLoaded(
      true,
      setLoading(false, { ...state, data: payload })
    ),
  get2025NdcTrackerFail: state => setLoading(setError(state, true), false)
};
