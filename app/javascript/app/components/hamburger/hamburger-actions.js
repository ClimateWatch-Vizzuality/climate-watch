import { createAction } from 'redux-actions';

export const openMenu = createAction('openMenu');
export const closeMenu = createAction('closeMenu');

export default {
  openMenu,
  closeMenu
};
