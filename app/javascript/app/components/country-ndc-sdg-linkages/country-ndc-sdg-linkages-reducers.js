export const initialState = {
  loading: false,
  loaded: false,
  tooltipData: {},
  data: {},
  infoOpen: false
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setCountryData = (state, { iso, data }) => ({
  ...state,
  data: { [iso]: data }
});
const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
});

const toogleNDCsSDGsInfo = state => ({
  ...state,
  infoOpen: !state.infoOpen
});

export default {
  fetchNDCsSDGsInit: state => setLoading(state, true),
  fetchNDCsSDGsReady: (state, { payload }) => {
    const countryData = { iso: payload.iso_code3, data: payload };
    return setLoaded(
      setLoading(setCountryData(state, countryData), false),
      true
    );
  },
  fetchNDCsSDGsFailed: (state, { payload }) => {
    const countryData = { iso: payload, data: {} };
    return setLoaded(
      setLoading(setCountryData(state, countryData), false),
      true
    );
  },
  setTooltipData,
  toogleNDCsSDGsInfo
};
