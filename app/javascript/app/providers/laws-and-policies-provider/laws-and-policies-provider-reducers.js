export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchLawsAndPoliciesInit: state => setLoading(true, state),
  fetchLawsAndPoliciesReady: (state, { payload }) => {
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
