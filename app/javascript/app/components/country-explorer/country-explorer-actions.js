import { createAction } from 'redux-actions'

export default {
  openCountryExplorer: createAction('openCountryExplorer'),
  closeCountryExplorer: createAction('closeCountryExplorer'),
  toggleCountryExplorer: createAction('toggleCountryExplorer')
}
