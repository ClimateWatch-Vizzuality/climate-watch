import { createAction } from 'redux-actions'

export const openCountryExplorer = createAction('openCountryExplorer')
export const closeCountryExplorer = createAction('closeCountryExplorer')
export const toggleCountryExplorer = createAction('toggleCountryExplorer')

export default {
  openCountryExplorer,
  closeCountryExplorer,
  toggleCountryExplorer
}
