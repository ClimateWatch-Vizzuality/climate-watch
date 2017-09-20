export const initialState = {
  loading: false,
  loaded: false,
  activeSector: null,
  tooltipData: {},
  data: {}
};

const setLoading = (state, loading) => ({ ...state, loading });
const setLoaded = (state, loaded) => ({ ...state, loaded });
const setCountryData = (state, { iso, data }) => ({
  ...state,
  data: { [iso]: data }
});
const setActiveSector = (state, { payload }) => ({
  ...state,
  activeSector: payload
});
const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
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
  setActiveSector,
  setTooltipData
};
