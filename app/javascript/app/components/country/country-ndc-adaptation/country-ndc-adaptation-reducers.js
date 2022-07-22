import qs from 'query-string';

export const initialState = {
  tooltipData: null,
  filters: {
    document: +qs.parse(window.location.search)?.document || null
  }
};

const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
});

const setFilter = (state, { payload }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...payload
  }
});

export default {
  setTooltipData,
  setFilter
};
