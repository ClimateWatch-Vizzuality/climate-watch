export const initialState = {
  open: false
};

const openCountriesMenu = (state, { payload }) => ({ ...state, open: payload });

export default {
  openCountriesMenu
};
