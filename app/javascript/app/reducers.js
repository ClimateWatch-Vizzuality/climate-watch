import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

import { reducers as countriesReducers } from 'components/countries-provider';
import { reducers as autocompleteSearchReducers } from 'components/autocomplete-search';
import { reducers as countrySelectReducers } from 'components/countries-select';
import { reducers as countryNDCReducers } from 'pages/ndc-country';
import { reducers as navReducers } from 'components/nav';
import { reducers as mapReducers } from 'components/map';
import initialState from './data/initial-state';
import allActions from './actions';

export default combineReducers({
  countries: handleActions(
    'countries',
    allActions,
    countriesReducers,
    initialState
  ),
  countryNDC: handleActions(
    'countryNDC',
    allActions,
    countryNDCReducers,
    initialState
  ),
  countrySelect: handleActions(
    'countrySelect',
    allActions,
    countrySelectReducers,
    initialState
  ),
  nav: handleActions('nav', allActions, navReducers, initialState),
  map: handleActions('map', allActions, mapReducers, initialState),
  autocompleteSearch: handleActions(
    'autocompleteSearch',
    allActions,
    autocompleteSearchReducers,
    initialState
  )
});
