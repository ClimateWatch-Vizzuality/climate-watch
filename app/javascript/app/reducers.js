/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

// Providers
import { redux as countriesProvider } from 'providers/countries-provider';
import { redux as regionsProvider } from 'providers/regions-provider';
import { redux as ndcsSdgsMetaProvider } from 'providers/ndcs-sdgs-meta-provider';
import { redux as ghgEmissionsProvider } from 'providers/ghg-emissions-meta-provider';
import { redux as geoLocationProvider } from 'providers/geolocation-provider';

const providersReducers = {
  countries: handleActions(countriesProvider),
  regions: handleActions(regionsProvider),
  ndcsSdgsMeta: handleActions(ndcsSdgsMetaProvider),
  ghgEmissionsMeta: handleActions(ghgEmissionsProvider),
  geoLocation: handleActions(geoLocationProvider)
};

// Pages
import { redux as NDCSPage } from 'pages/ndcs';
import { redux as countryNDCPage } from 'pages/ndc-country';
import { redux as countryNDCFullPage } from 'pages/ndc-country-full';
import { redux as NDCComparePage } from 'pages/ndc-compare';
import { redux as ndcSearchPage } from 'pages/ndc-search';
import { redux as ndcSdgPage } from 'pages/ndc-sdg';

const pagesReducers = {
  ndcs: handleActions(NDCSPage),
  countryNDC: handleActions(countryNDCPage),
  countryNDCFull: handleActions(countryNDCFullPage),
  NDCCompare: handleActions(NDCComparePage),
  ndcSearch: handleActions(ndcSearchPage),
  ndcSdg: handleActions(ndcSdgPage)
};

// Components
import { redux as mapComponent } from 'components/map';
import { redux as autocompleteSearchComponent } from 'components/autocomplete-search';
import { redux as ndcsAutocompleteSearchComponent } from 'components/ndcs-autocomplete-search';
import { redux as storiesComponent } from 'components/stories';
import { redux as countrySelectComponent } from 'components/countries-select';
import { redux as ghgEmissionsComponent } from 'components/ghg-emissions';
import { redux as modalMetadataComponent } from 'components/modal-metadata';
import { redux as countryGhgEmissionsMapComponent } from 'components/country-ghg-map';
import { redux as countryGhgEmissionsComponent } from 'components/country-ghg-emissions';
import { redux as countrySDGLinkagesComponent } from 'components/country-ndc-sdg-linkages';
import { redux as countryNDCOverviewComponent } from 'components/country-ndc-overview';

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
