export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchEspModelsInit: state => setLoading(true, state),
  fetchEspModelsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  fetchEspModelsFail: state => setLoading(false, { ...state })
};
