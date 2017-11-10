export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getEspTimeSeriesInit: state => setLoading(true, state),
  getEspTimeSeriesReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: payload
    };

    return setLoaded(true, setLoading(false, newState));
  }
};
