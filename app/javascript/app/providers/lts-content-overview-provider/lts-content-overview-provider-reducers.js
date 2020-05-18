export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    locations: {}
  }
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  getLtsContentOverviewInit: state => setLoading(true, state),
  getLtsContentOverviewReady: (state, { payload }) => {
    const locationCodes = payload.locations;
    const locations = locationCodes.reduce(
      (accum, l) => ({ ...accum, [l]: payload.data[l] }),
      {}
    );
    const newState = {
      ...state,
      data: {
        locations: { ...state.data.locations, ...locations }
      }
    };
    return setLoaded(true, setLoading(false, newState));
  },
  getLtsContentOverviewFail: state => setError(state, true)
};
