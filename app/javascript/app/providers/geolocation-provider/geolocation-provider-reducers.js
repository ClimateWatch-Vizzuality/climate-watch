export const initialState = {
  requested: false,
  error: false,
  errorMsg: '',
  ipData: {}
};

const setRequested = (state, requested) => ({ ...state, requested });
const setPosition = (state, ipData) => ({ ...state, ipData });
const setError = (state, { error, errorMsg }) => ({
  ...state,
  error,
  errorMsg
});

export default {
  requestLocationInit: state => setRequested(state, true),
  requestLocationReady: (state, { payload }) => setPosition(state, payload),
  requestLocationError: (state, { payload }) =>
    setError(state, { error: true, errorMsg: payload })
};
