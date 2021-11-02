export const initialState = {
  loading: false,
  loaded: false,
  data: [],
  count: null
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getCountriesInit: state => setLoading(true, state),
  getCountriesReady: (state, { payload: { data } }) =>
    setLoaded(true, setLoading(false, { ...state, data, count: data.length }))
};
