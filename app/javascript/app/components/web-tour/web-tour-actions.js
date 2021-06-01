import { createAction } from 'redux-actions';

const setActiveTourSlug = createAction('setActiveTourSlug');
const setOpen = createAction('setOpen');

export default {
  setActiveTourSlug,
  setOpen
};
