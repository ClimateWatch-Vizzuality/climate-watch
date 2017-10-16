export const initialState = {
  query: '',
  preSelect: ''
};

const countrySelectFilter = (state, { payload }) => ({
  ...state,
  query: payload
});

const countryPreSelect = (state, { payload }) => ({
  ...state,
  preSelect: payload
});

export default {
  countryPreSelect,
  countrySelectFilter
};
