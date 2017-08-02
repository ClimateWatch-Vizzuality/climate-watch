import { countryExplorer as initialSate } from 'data/initial-state'
import actions from './country-explorer-actions'

const setOpen = (state, open) => ({ ...state, open })

export default {
  [actions.openCountryExplorer]: (state = initialSate, payload) => setOpen(state, true),
  [actions.closeCountryExplorer]: (state = initialSate, payload) => setOpen(state, false),
  [actions.toggleCountryExplorer]: (state = initialSate, payload) => setOpen(state, !state.open)
}
