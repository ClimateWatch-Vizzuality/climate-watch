const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchMeDataInit: (state, { payload }) =>
    console.log('fetchMeDataInit', payload) || setLoading(true, state),
  fetchMeData: (state, { payload }) =>
    console.log('fetchMeData', payload) || state,
  fetchMeDataReady: (state, { payload }) =>
    console.log('fetchMeDataReady', payload) ||
    setLoaded(true, setLoading(false, { ...state, data: payload }))
};
