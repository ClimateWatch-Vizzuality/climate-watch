import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

import { reducers as countryExplorerReducers } from 'components/country-explorer';
import { reducers as countrySelectReducers } from 'components/countries-select';
import { reducers as countryNDCReducers } from 'components/ndc-country';
import initialState from './data/initial-state';
import allActions from './actions';

export default combineReducers({
  countryNDC: handleActions(
    'countryNDC',
    allActions,
    countryNDCReducers,
    initialState
  ),
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
