import * as actions from './hamburger-actions';

export const initialState = {
  isOpen: false
};

export default {
  [actions.openMenu]: state => ({ ...state, isOpen: true }),
  [actions.closeMenu]: state => ({ ...state, isOpen: false })
};
