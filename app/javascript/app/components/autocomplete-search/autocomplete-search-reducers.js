export const initialState = {
  query: ''
};

const setAutocompleteSearch = (state, { payload }) => ({
  ...state,
  query: payload
});

export default {
  setAutocompleteSearch
};
