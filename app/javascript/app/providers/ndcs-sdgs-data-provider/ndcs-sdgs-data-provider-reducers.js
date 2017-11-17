import isEmpty from 'lodash/isEmpty';

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
  getNdcsSdgsDataInit: state => setLoading(true, state),
  getNdcsSdgsDataFail: state => setLoading(false, setError(state, true)),
  getNdcsSdgsDataReady: (state, { payload }) => {
    if (isEmpty(payload)) {
      return setLoaded(true, setLoading(false, state));
    }
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso_code3]: payload
      }
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
