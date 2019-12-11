export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  fetchNdcsCountryAccordionInit: state => setLoading(true, state),
  fetchNdcsCountryAccordionReady: (state, { payload }) => {
    // const locationCodes = payload.locations;
    // const locations = locationCodes.reduce(
    //   (accum, l) => ({ ...accum, [l]: payload.data[l] }),
    //   {}
    // );
    const newState = {
      ...state
      // ,
      // ...payload
    };
    return setLoaded(true, setLoading(false, newState));
  },
  fetchNdcsCountryAccordionFailed: state => setError(state, true)
};
