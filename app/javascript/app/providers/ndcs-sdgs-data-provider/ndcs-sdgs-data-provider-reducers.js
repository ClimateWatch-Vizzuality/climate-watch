import isEmpty from 'lodash/isEmpty';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getNdcsSdgsDataInit: state => setLoading(true, state),
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
