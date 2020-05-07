export const initialState = {
  activeIndex: null
};

export default {
  selectActiveDonutIndex: (state, { payload }) => ({
    ...state,
    activeIndex: payload
  })
};
