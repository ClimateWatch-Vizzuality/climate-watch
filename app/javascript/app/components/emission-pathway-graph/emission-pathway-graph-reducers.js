export const initialState = {
  loading: false,
  loaded: false,
  modelIds: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  findAvailableModelsInit: state => setLoading(true, state),
  findAvailableModelsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, modelIds: payload })),
  findAvailableModelsFail: state => setLoading(false, { ...state })
};
