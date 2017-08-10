import actions from './country-explorer-actions';

const setOpen = (state, open) => ({ ...state, open });

export default {
  [actions.openCountryExplorer]: state => setOpen(state, true),
  [actions.closeCountryExplorer]: state => setOpen(state, false),
  [actions.toggleCountryExplorer]: state => setOpen(state, !state.open)
};
