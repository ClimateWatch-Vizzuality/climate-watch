export const initialState = {
  isOpen: false,
  slug: null
};

export default {
  setOpen: (state, { payload: { isOpen } }) => ({ ...state, isOpen })
};
