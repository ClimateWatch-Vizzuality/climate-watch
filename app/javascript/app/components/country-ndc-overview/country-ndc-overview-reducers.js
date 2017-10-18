import isEmpty from 'lodash/isEmpty';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });

export default {
  fetchCountryNdcOverviewInit: state => setLoading(state, true),
  fetchCountryNdcOverviewDataReady: (state, { payload }) => {
    if (isEmpty(payload)) {
      return setLoaded(setLoading(false, state), true);
    }
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso]: payload.data
      }
    };
    return setLoaded(setLoading(newState, false), true);
  },
  fetchCountryNdcOverviewFail: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload]: {}
      }
    };
    return setLoaded(setLoading(false, newState), true);
  }
};
