export const initialState = {
  query: ''
};

const setNdcsAutocompleteSearch = (state, { payload }) => ({
  ...state,
  query: payload
});

export default {
  setNdcsAutocompleteSearch
};
