import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { handleActions } from 'app/utils/redux'

import { reducers as countryExplorerReducers } from 'components/country-explorer'
import initialState from './data/initial-state'
import allActions from './actions'

export default combineReducers({
  router,
  countryExplorer: handleActions(allActions, countryExplorerReducers, initialState, 'countryExplorer')
})
