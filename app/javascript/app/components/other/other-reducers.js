export default {
  fetchMeDataInit: (state, { payload }) => console.log('fetchMeDataInit', payload) || state,
  fetchMeData: (state, { payload }) => console.log('fetchMeData', payload) || state,
  fetchMeDataReady: (state, { payload }) => console.log('fetchMeDataReady', payload) || state
}
