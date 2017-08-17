import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

import { reducers as countryExplorerReducers } from 'components/country-explorer';
import { reducers as ndcReducers } from 'components/ndc';
import { reducers as countrySelectReducers } from 'components/countries-select';
import initialState from './data/initial-state';
import allActions from './actions';

export default combineReducers({
  ndc: handleActions('ndc', allActions, ndcReducers, initialState),
  countryExplorer: handleActions(
    'countryExplorer',
    allActions,
    countryExplorerReducers,
    initialState
  ),
  countrySelect: handleActions(
    'countrySelect',
    allActions,
    countrySelectReducers,
    initialState
  )
});
