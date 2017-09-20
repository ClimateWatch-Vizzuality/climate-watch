export const initialState = {
  loading: false,
  loaded: false,
  activeSector: null,
  tooltipData: {},
  data: {}
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setActiveSector = (sector, state) => ({ ...state, activeSector: sector });
const setTooltipData = (data, state) => ({ ...state, tooltipData: data });

export default {
  fetchNDCsSDGsInit: state => setLoading(true, state),
  fetchNDCsSDGsReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        [payload.iso_code3]: payload
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchNDCsSDGsFailed: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        [payload]: {}
      }
    };

    return setLoaded(true, setLoading(false, newState));
  },
  setActiveSector: (state, { payload }) => setActiveSector(payload, state),
  setTooltipData: (state, { payload }) => setTooltipData(payload, state)
};
