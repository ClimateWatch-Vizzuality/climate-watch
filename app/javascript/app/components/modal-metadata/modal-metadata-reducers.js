export const initialState = {
  loaded: false,
  loading: false,
  isOpen: false,
  title: 'Metadata info modal',
  active: '',
  data: {}
};

const setModalMetadataParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  active: payload.slug
});

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setData = (state, data) => ({
  ...state,
  data: {
    ...state.data,
    [data.slug]: data
  }
});

export default {
  setModalMetadataParams,
  fetchModalMetaDataInit: state => setLoading(state, true),
  fetchModalMetaDataReady: (state, { payload }) =>
    setLoaded(setLoading(setData(state, payload), false), true),
  fetchModalMetaDataFail: state => setError(state, true)
};
