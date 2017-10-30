export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchNDCCountryAccordionInit: state => setLoading(true, state),
  fetchNDCCountryAccordionReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso]: payload.data
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchNDCCountryAccordionFailed: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload]: []
      }
    };

    return setLoaded(true, setLoading(false, newState));
  }
};
