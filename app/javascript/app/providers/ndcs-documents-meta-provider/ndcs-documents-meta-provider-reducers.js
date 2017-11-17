import groupBy from 'lodash/groupBy';

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
  fetchNdcsDocumentsMetaInit: state => setLoading(true, state),
  fetchNdcsDocumentsMetaFail: state => setLoading(false, setError(state, true)),
  fetchNdcsDocumentsMetaReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: groupBy(payload, 'location.iso_code3')
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
