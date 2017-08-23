export const initialState = {
  countriesOpen: false
};

const setCountriesVisibility = (state, { payload }) => ({
  ...state,
  countriesOpen: payload
});

export default {
  setCountriesVisibility
};
