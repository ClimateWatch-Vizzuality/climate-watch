export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchEspIndicatorsInit: state => setLoading(true, state),
  fetchEspIndicatorsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  fetchEspIndicatorsFail: state =>
    setLoading(false, setLoaded(true, { ...state }))
};
