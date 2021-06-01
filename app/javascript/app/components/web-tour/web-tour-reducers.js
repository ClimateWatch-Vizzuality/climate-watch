export const initialState = {
  isOpen: true,
  slug: 'home'
};

export default {
  setOpen: (state, { isOpen }) => ({ ...state, isOpen }),
  setActiveTourSlug: (state, { payload }) => ({ ...state, slug: payload })
};
