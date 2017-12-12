export const initialState = {
  loading: false,
  loaded: false,
  locations: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  findAvailableModelsInit: state => setLoading(true, state),
  findAvailableModelsReady: (state, { payload }) =>
    setLoaded(
      true,
      setLoading(false, {
        ...state,
        locations: {
          ...state.locations,
          [payload.locationId]: payload.modelIds
        }
      })
    ),
  findAvailableModelsFail: state => setLoading(false, { ...state })
};
