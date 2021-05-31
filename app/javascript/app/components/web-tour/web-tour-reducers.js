export const initialState = {
  isOpen: true
};

export default {
  setOpen: (state, { isOpen }) => ({ ...state, isOpen })
};
