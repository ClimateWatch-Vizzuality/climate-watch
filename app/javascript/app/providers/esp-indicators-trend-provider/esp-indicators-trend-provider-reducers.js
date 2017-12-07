export const initialState = {
  loading: false,
  loaded: false,
  data: {
    locations: {}
  }
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getIndicatorsTrendDataInit: state => setLoading(true, state),
  getIndicatorsTrendDataReady: (state, { payload }) => {
    const locationId = payload.locationId;
    const scenarioId = payload.scenarioId;
    const newState = {
      ...state,
      data: {
        locations: {
          ...state.data.locations,
          [locationId]: {
            scenarios: {
              ...(state.data.locations && state.data.locations[locationId]
                ? state.data.locations[locationId].scenarios
                : []),
              [scenarioId]: payload.data
            }
          }
        }
      }
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
