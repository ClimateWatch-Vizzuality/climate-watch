import actions from './country-explorer-actions'

const setOpen = (state, open) => ({ ...state, open })

export default {
  [actions.openCountryExplorer]: (state, payload) => setOpen(state, true),
  [actions.closeCountryExplorer]: (state, payload) => setOpen(state, false),
  [actions.toggleCountryExplorer]: (state, payload) => setOpen(state, !state.open)
}
