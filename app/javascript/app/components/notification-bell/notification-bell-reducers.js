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
  fetchNotificationsInit: state => setLoading(state, true),
  fetchNotificationsReady: (state, { payload }) =>
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
  fetchNotificationsFail: state => setError(state, true)
};
