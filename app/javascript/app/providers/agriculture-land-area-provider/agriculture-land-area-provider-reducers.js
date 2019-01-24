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
  fetchAgricultureLandAreaInit: state => setLoading(true, state),
  fetchAgricultureLandAreaReady: (state, { payload: { data, meta } }) =>
    setLoaded(true, setLoading(false, { ...state, data, meta })),
  fetchAgricultureLandAreaFail: state =>
    setLoading(setError(state, true), false)
};
