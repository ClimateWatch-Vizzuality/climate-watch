export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchNDCsSDGsInit: state => setLoading(true, state),
  fetchNDCsSDGsReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        [payload.iso_code3]: payload
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchNDCsSDGsFailed: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        [payload]: {}
      }
    };

    return setLoaded(true, setLoading(false, newState));
  }
};
