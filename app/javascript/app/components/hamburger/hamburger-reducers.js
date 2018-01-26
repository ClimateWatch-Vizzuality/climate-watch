import * as actions from './hamburger-actions';

export const openMenu = state => ({ ...state, isOpen: true });
export const closeMenu = state => ({ ...state, isOpen: false });

export default {
  [actions.openMenu]: openMenu,
  [actions.closeMenu]: closeMenu
};
