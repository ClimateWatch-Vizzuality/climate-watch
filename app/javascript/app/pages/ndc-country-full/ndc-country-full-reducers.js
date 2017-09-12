export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchCountryNDCFullInit: state => setLoading(true, state),
  fetchCountryNDCFullReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.location.iso_code3]: payload
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchCountryNDCFullFailed: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload]: {}
      }
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
