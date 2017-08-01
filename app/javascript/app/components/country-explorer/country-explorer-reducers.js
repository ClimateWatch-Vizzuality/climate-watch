import { countryExplorer as initialSate } from 'data/initial-state'

const setOpen = (state, open) => ({ ...state, open })

export const openCountryExplorer = (state = initialSate, payload) => setOpen(state, true)
export const closeCountryExplorer = (state = initialSate, payload) => setOpen(state, false)
export const toggleCountryExplorer = (state = initialSate, payload) => setOpen(state, !state.open)

export default {
  openCountryExplorer,
  closeCountryExplorer,
  toggleCountryExplorer
}
