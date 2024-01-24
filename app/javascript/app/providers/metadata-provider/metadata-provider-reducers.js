export const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  getMetadataInit: state => setLoading(state, true),
  getMetadataReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, data: payload }, false), true),
  getMetadataFail: state => setError(state, true)
};
