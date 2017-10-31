/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

// Providers
import * as countriesProvider from 'providers/countries-provider';
import * as regionsProvider from 'providers/regions-provider';
import * as adaptationsProvider from 'providers/adaptations-provider';
import * as ndcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import * as ndcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import * as ghgEmissionsProvider from 'providers/ghg-emissions-meta-provider';
import * as geoLocationProvider from 'providers/geolocation-provider';
import * as wbCountryProvider from 'providers/wb-country-data-provider';
import * as timelineProvider from 'providers/timeline-provider';
import * as socioeconomicsProvider from 'providers/socioeconomics-provider';

const providersReducers = {
  countries: handleActions(countriesProvider),
  regions: handleActions(regionsProvider),
  adaptations: handleActions(adaptationsProvider),
  ndcsSdgsMeta: handleActions(ndcsSdgsMetaProvider),
  ndcsSdgsData: handleActions(ndcsSdgsDataProvider),
  ghgEmissionsMeta: handleActions(ghgEmissionsProvider),
  geoLocation: handleActions(geoLocationProvider),
  wbCountryData: handleActions(wbCountryProvider),
  socioeconomics: handleActions(socioeconomicsProvider),
  timeline: handleActions(timelineProvider)
};

// Pages
import * as NDCSPage from 'pages/ndcs';

import * as countryNDCFullPage from 'pages/ndc-country-full';
import * as NDCComparePage from 'pages/ndc-compare';
import * as ndcSearchPage from 'pages/ndc-search';
import * as ndcSdgPage from 'pages/ndc-sdg';

const pagesReducers = {
  ndcs: handleActions(NDCSPage),
  countryNDCFull: handleActions(countryNDCFullPage),
  NDCCompare: handleActions(NDCComparePage),
  ndcSearch: handleActions(ndcSearchPage),
  ndcSdg: handleActions(ndcSdgPage)
};

// Components
import * as mapComponent from 'components/map';
import * as autocompleteSearchComponent from 'components/autocomplete-search';
import * as storiesComponent from 'components/stories';
import * as countrySelectComponent from 'components/countries-select';
import * as ghgEmissionsComponent from 'components/ghg-emissions';
import * as modalMetadataComponent from 'components/modal-metadata';
import * as ndcCountryAccordion from 'components/ndcs-country-accordion';
import * as countryGhgEmissionsMapComponent from 'components/country-ghg-map';
import * as countryGhgEmissionsComponent from 'components/country-ghg-emissions';
import * as countrySDGLinkagesComponent from 'components/country-ndc-sdg-linkages';
import * as countryNDCOverviewComponent from 'components/country-ndc-overview';

const componentsReducers = {
  map: handleActions(mapComponent),
  autocompleteSearch: handleActions(autocompleteSearchComponent),
  stories: handleActions(storiesComponent),
  countrySelect: handleActions(countrySelectComponent),
  ghgEmissions: handleActions(ghgEmissionsComponent),
  modalMetadata: handleActions(modalMetadataComponent),
  ndcCountryAccordion: handleActions(ndcCountryAccordion),
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
