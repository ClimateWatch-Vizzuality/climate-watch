import * as actions from './nav-enhanced-menu-actions';

const openMenu = state => ({ ...state, isOpen: true });
const closeMenu = state => ({ ...state, isOpen: false });

export default {
  [actions.openMenu]: openMenu,
  [actions.closeMenu]: closeMenu
};
