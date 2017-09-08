export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchCompareNDCInit: state => setLoading(true, state),
  fetchCompareNDCReady: (state, { payload }) => {
    const data = { ...state, data: payload };

    return setLoaded(true, setLoading(false, data));
  },
  fetchCompareNDCFailed: state => {
    const data = {
      ...state,
      data: {
        fetched: true
      }
    };

    return setLoaded(true, setLoading(false, data));
  }
};
