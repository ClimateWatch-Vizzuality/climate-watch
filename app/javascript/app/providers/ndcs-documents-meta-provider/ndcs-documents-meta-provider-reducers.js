import groupBy from 'lodash/groupBy';

export const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchNdcsDocumentsMetaInit: state => setLoading(true, state),
  fetchNdcsDocumentsMetaReady: (state, { payload }) => {
    const ndcs = payload && payload.ndcs;
    const newState = {
      ...state,
      data: groupBy(ndcs, 'location.iso_code3')
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
