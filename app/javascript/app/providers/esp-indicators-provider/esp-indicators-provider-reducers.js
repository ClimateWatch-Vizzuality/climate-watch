export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (error, state) => ({ ...state, error });

export default {
  fetchEspIndicatorsInit: state => setLoading(true, state),
  fetchEspIndicatorsReady: (state, { payload }) =>
    setError(
      false,
      setLoaded(true, setLoading(false, { ...state, data: payload }))
    ),
  fetchEspIndicatorsFail: state => {
    setError(true, setLoading(false, setLoaded(true, { ...state })));
  }
};
