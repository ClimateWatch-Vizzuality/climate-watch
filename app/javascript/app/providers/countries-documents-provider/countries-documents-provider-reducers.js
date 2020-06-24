export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null,
  framework: null,
  sectoral: null
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchCountriesDocumentsInit: state => setLoading(state, true),
  fetchCountriesDocumentsReady: (state, { payload }) =>
    setLoaded(
      setLoading(
        {
          ...state,
          ...payload
        },
        false
      ),
      true
    ),
  fetchCountriesDocumentsFail: state => setError(state, true)
};
