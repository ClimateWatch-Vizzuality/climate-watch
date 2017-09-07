export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchCountryNDCInit: state => setLoading(true, state),
  fetchCountryNDCReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso]: payload.data
      }
    };
    return setLoaded(true, setLoading(false, newState));
  },
  fetchCountryNDCFailed: (state, { payload }) => {
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
