import * as actions from './hamburger-actions';

export default {
  [actions.openMenu]: state => ({ ...state, isOpen: true }),
  [actions.closeMenu]: state => ({ ...state, isOpen: false })
};
