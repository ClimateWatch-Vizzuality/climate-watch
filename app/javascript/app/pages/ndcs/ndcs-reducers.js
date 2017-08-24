export const initialState = {
  loading: false,
  loaded: false,
  data: null
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchNDCSInit: state => setLoading(true, state),
  fetchNDCSReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload }))
};
