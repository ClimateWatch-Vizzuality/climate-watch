import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

import { reducers as countryExplorerReducers } from 'components/country-explorer';
import { reducers as ndcReducers } from 'components/ndc';
import initialState from './data/initial-state';
import allActions from './actions';

export default combineReducers({
  ndc: handleActions('ndc', allActions, ndcReducers, initialState),
  countryExplorer: handleActions(
    'countryExplorer',
    allActions,
    countryExplorerReducers,
    initialState
  )
});
