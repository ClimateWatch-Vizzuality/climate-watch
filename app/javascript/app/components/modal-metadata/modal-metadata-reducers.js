export const initialState = {
  loaded: false,
  loading: false,
  isOpen: false,
  customTitle: '',
  disclaimerConfig: { display: false, onlyText: false },
  active: [],
  data: {}
};

const setModalMetadataParams = (state, { payload }) => ({
  ...state,
  isOpen: payload.open,
  active: typeof payload.slugs === 'string' ? [payload.slugs] : payload.slugs,
  disclaimerConfig: {
    display:
      (payload.disclaimerConfig && payload.disclaimerConfig.display) || false,
    onlyText:
      (payload.disclaimerConfig && payload.disclaimerConfig.onlyText) || false
  },
  customTitle: payload.customTitle || state.title
});

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setData = (state, { slugs, data }) => {
  let slugData = {};
  slugs.forEach((slug, i) => {
    slugData = { ...slugData, [slug]: data[i] };
  });
  return {
    ...state,
    data: {
      ...state.data,
      ...slugData
    }
  };
};

export default {
  setModalMetadataParams,
  fetchModalMetaDataInit: state => setLoading(setLoaded(state, false), true),
  fetchModalMetaDataReady: (state, { payload }) =>
    setLoaded(setLoading(setData(state, payload), false), true)
};
