import isEmpty from 'lodash/isEmpty';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getESPTimeSeriesInit: state => setLoading(true, state),
  getESPTimeSeriesReady: (state, { payload }) => {
    if (isEmpty(payload.data)) {
      return setLoaded(true, setLoading(false, state));
    }
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso]: payload.data
      }
    };

    return setLoaded(true, setLoading(false, newState));
  }
};
