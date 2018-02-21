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
  getNdcContentOverviewInit: state => setLoading(true, state),
  getNdcContentOverviewReady: (state, { payload }) => {
    const locationCodes = payload.locations;
    const locations = locationCodes.reduce(
      (accum, l) => ({ ...accum, [l]: payload.data[l] }),
      {}
    );
    console.log('l', locationCodes);
    console.log('l', payload.data);
    console.log('l', locations);
    const newState = {
      ...state,
      data: {
        locations: { ...state.data.locations, ...locations }
      }
    };
    console.log('n', newState);
    return setLoaded(true, setLoading(false, newState));
  },
  getNdcContentOverviewFail: state => setError(state, true)
};
