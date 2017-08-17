const setCountriesVisibility = (isOpen, state) => ({
  ...state,
  countriesOpen: isOpen
});

export default {
  setCountriesVisibility: (state, { payload }) =>
    setCountriesVisibility(payload, state)
};
