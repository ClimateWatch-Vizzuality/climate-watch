export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchLawsAndPoliciesInit: state => setLoading(true, state),
  fetchLawsAndPoliciesReady: state => setLoaded(true, setLoading(false, state))
};
