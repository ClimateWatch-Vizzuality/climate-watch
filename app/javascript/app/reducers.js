import { combineReducers } from 'redux'
import { handleActions } from 'app/utils/redux'

import { reducers as countryExplorerReducers } from 'components/country-explorer'
import { reducers as otherReducers } from 'components/other'
import initialState from './data/initial-state'
import allActions from './actions'

export default combineReducers({
  other: handleActions(
    'other',
    allActions,
    otherReducers,
    initialState
  ),
  countryExplorer: handleActions(
    'countryExplorer',
    allActions,
    countryExplorerReducers,
    initialState
  )
})
