export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getCountriesInit: state => setLoading(true, state),
  getCountriesReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload }))
};
