/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

// Providers
import * as countriesProvider from 'providers/countries-provider';
import * as regionsProvider from 'providers/regions-provider';
import * as ndcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import * as ghgEmissionsProvider from 'providers/ghg-emissions-meta-provider';
import * as geoLocationProvider from 'providers/geolocation-provider';

const providersReducers = {
  countries: handleActions(countriesProvider),
  regions: handleActions(regionsProvider),
  ndcsSdgsMeta: handleActions(ndcsSdgsMetaProvider),
  ghgEmissionsMeta: handleActions(ghgEmissionsProvider),
  geoLocation: handleActions(geoLocationProvider)
};

// Pages
import * as NDCSPage from 'pages/ndcs';
import * as countryNDCPage from 'pages/ndc-country';
import * as countryNDCFullPage from 'pages/ndc-country-full';
import * as NDCComparePage from 'pages/ndc-compare';
import * as ndcSearchPage from 'pages/ndc-search';
import * as ndcSdgPage from 'pages/ndc-sdg';

const pagesReducers = {
  ndcs: handleActions(NDCSPage),
  countryNDC: handleActions(countryNDCPage),
  countryNDCFull: handleActions(countryNDCFullPage),
  NDCCompare: handleActions(NDCComparePage),
  ndcSearch: handleActions(ndcSearchPage),
  ndcSdg: handleActions(ndcSdgPage)
};

// Components
import * as mapComponent from 'components/map';
import * as autocompleteSearchComponent from 'components/autocomplete-search';
import * as ndcsAutocompleteSearchComponent from 'components/ndcs-autocomplete-search';
import * as storiesComponent from 'components/stories';
import * as countrySelectComponent from 'components/countries-select';
import * as ghgEmissionsComponent from 'components/ghg-emissions';
import * as modalMetadataComponent from 'components/modal-metadata';
import * as countryGhgEmissionsMapComponent from 'components/country-ghg-map';
import * as countryGhgEmissionsComponent from 'components/country-ghg-emissions';
import * as countrySDGLinkagesComponent from 'components/country-ndc-sdg-linkages';
import * as countryNDCOverviewComponent from 'components/country-ndc-overview';

const componentsReducers = {
  map: handleActions(mapComponent),
  autocompleteSearch: handleActions(autocompleteSearchComponent),
  ndcsAutocompleteSearch: handleActions(ndcsAutocompleteSearchComponent),
  stories: handleActions(storiesComponent),
  countrySelect: handleActions(countrySelectComponent),
  ghgEmissions: handleActions(ghgEmissionsComponent),
  modalMetadata: handleActions(modalMetadataComponent),
  countryGhgEmissionsMap: handleActions(countryGhgEmissionsMapComponent),
  countryGhgEmissions: handleActions(countryGhgEmissionsComponent),
  countrySDGLinkages: handleActions(countrySDGLinkagesComponent),
  countryNDCOverview: handleActions(countryNDCOverviewComponent)
};

export default combineReducers({
  ...providersReducers,
  ...pagesReducers,
  ...componentsReducers
});
