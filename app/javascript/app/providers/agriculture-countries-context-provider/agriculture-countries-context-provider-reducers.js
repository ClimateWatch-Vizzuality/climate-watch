export const initialState = {
  loading: false,
  loaded: false,
  data: [],
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchAgricultureCountriesContextsInit: state => setLoading(true, state),
  fetchAgricultureCountriesContextsReady: (state, { payload: { data } }) =>
    setLoaded(true, setLoading(false, { ...state, data })),
  fetchAgricultureCountriesContextsFail: state =>
    setLoading(setError(state, true), false)
};
