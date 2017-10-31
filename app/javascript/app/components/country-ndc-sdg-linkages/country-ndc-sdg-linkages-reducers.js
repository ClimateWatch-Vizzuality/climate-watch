export const initialState = {
  tooltipData: {},
  infoOpen: false
};

const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
});

const toogleNDCsSDGsInfo = state => ({
  ...state,
  infoOpen: !state.infoOpen
});

export default {
  setTooltipData,
  toogleNDCsSDGsInfo
};
