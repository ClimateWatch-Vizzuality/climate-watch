export const initialState = {
  years: null
};

const setYears = (state, { payload }) => ({ ...state, years: payload });

export default { setYears };
