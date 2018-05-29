export const initialState = {
  activeSection: ''
};

const setActiveSection = (state, { payload }) => ({
  ...state,
  activeSection: payload
});

export default {
  setActiveSection
};
