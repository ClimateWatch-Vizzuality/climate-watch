export const initialState = {
  selectedSDG: null
};

const selectSDG = (state, { payload }) => ({ ...state, selectedSDG: payload });

export default {
  selectSDG
};
