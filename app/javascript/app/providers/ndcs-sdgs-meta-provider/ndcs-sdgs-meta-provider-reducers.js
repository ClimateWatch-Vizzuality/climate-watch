export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  getNdcsSdgsMetaInit: state => setLoading(true, state),
  getNdcsSdgsMetaFail: state => setLoading(false, setError(state, true)),
  getNdcsSdgsMetaReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload }))
};
