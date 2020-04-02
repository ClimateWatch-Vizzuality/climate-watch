export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchNDCSDocumentsInit: state => setLoading(state, true),
  fetchNDCSDocumentsReady: (state, { payload }) =>
    setLoaded(
      setLoading(
        {
          ...state,
          data: payload
        },
        false
      ),
      true
    ),
  fetchNDCSDocumentsFail: state => setError(state, true)
};
