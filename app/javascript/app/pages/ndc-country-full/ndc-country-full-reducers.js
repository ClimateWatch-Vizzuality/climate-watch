import isEmpty from 'lodash/isEmpty';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchCountryNDCFullInit: state => setLoading(true, state),
  fetchCountryNDCFullReady: (state, { payload }) => {
    if (isEmpty(payload)) {
      return setLoaded(true, setLoading(false, state));
    }

    const newState = {
      ...state,
      selected: payload[0].id,
      data: {
        ...state.data,
        [payload[0].location.iso_code3]: payload
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchCountryNDCFullFailed: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload]: []
      }
    };
    return setLoaded(true, setLoading(false, newState));
  },
  changeSelectedCountryNDCFull: (state, { payload }) => {
    const newState = {
      ...state,
      selected: payload
    };
    return newState;
  }
};
