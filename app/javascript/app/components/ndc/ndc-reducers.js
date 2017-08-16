const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchMeDataInit: (state, { payload }) =>
    console.info('fetchMeDataInit', payload) || setLoading(true, state),
  fetchMeData: (state, { payload }) =>
    console.info('fetchMeData', payload) || state,
  fetchMeDataReady: (state, { payload }) =>
    console.info('fetchMeDataReady', payload) ||
    setLoaded(true, setLoading(false, { ...state, data: payload }))
};
