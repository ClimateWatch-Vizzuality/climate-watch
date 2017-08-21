const setCountriesVisibility = (state, { payload }) => ({
  ...state,
  countriesOpen: payload
});

export default {
  setCountriesVisibility
};
