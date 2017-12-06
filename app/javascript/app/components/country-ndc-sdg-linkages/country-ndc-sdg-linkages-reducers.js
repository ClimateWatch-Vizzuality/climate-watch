export const initialState = {
  tooltipData: {}
};

const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
});

export default {
  setTooltipData
};
