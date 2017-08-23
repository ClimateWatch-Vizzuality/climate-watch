const setCountriesDropdown = (state, { payload }) => ({
  ...state,
  countrySelected: payload
});

export default {
  setCountriesDropdown
};
