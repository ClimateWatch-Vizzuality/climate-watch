/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';

// Providers
import * as countriesProvider from 'providers/countries-provider';
import * as regionsProvider from 'providers/regions-provider';
import * as espLocationsProvider from 'providers/esp-locations-provider';
import * as espTimeSeriesProvider from 'providers/esp-time-series-provider';
import * as adaptationsProvider from 'providers/adaptations-provider';
import * as ndcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import * as ndcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import * as ghgEmissionsProvider from 'providers/ghg-emissions-meta-provider';
import * as geoLocationProvider from 'providers/geolocation-provider';
import * as wbCountryProvider from 'providers/wb-country-data-provider';
import * as timelineProvider from 'providers/timeline-provider';
import * as socioeconomicsProvider from 'providers/socioeconomics-provider';
import * as ndcsDocumentsMetaProvider from 'providers/ndcs-documents-meta-provider';
import * as espModelsProvider from 'providers/esp-models-provider';
import * as espScenariosProvider from 'providers/esp-scenarios-provider';
import * as espIndicatorsProvider from 'providers/esp-indicators-provider';
import * as espIndicatorsTrendProvider from 'providers/esp-indicators-trend-provider';

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
  timeline: handleActions(timelineProvider),
  ndcsDocumentsMeta: handleActions(ndcsDocumentsMetaProvider),
  espModels: handleActions(espModelsProvider),
  espScenarios: handleActions(espScenariosProvider),
  espIndicators: handleActions(espIndicatorsProvider),
  espIndicatorsTrend: handleActions(espIndicatorsTrendProvider),
  espLocations: handleActions(espLocationsProvider),
  espTimeSeries: handleActions(espTimeSeriesProvider)
};

// Pages
import * as NDCSPage from 'pages/ndcs';

import * as countryNDCFullPage from 'pages/ndc-country-full';
import * as ndcSearchPage from 'pages/ndc-search';
import * as ndcSdgPage from 'pages/ndc-sdg';

const pagesReducers = {
  ndcs: handleActions(NDCSPage),
  countryNDCFull: handleActions(countryNDCFullPage),
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
import * as modalESPOverviewComponent from 'components/modal-overview';
import * as ndcCountryAccordion from 'components/ndcs-country-accordion';
import * as countryGhgEmissionsMapComponent from 'components/country-ghg-map';
import * as countryGhgEmissionsComponent from 'components/country-ghg-emissions';
import * as countrySDGLinkagesComponent from 'components/country-ndc-sdg-linkages';
import * as countryNDCOverviewComponent from 'components/country-ndc-overview';
import * as emissionPathwayGraphComponent from 'components/emission-pathway-graph';

const componentsReducers = {
  map: handleActions(mapComponent),
  autocompleteSearch: handleActions(autocompleteSearchComponent),
  stories: handleActions(storiesComponent),
  countrySelect: handleActions(countrySelectComponent),
  ghgEmissions: handleActions(ghgEmissionsComponent),
  modalMetadata: handleActions(modalMetadataComponent),
  modalESPOverview: handleActions(modalESPOverviewComponent),
  ndcCountryAccordion: handleActions(ndcCountryAccordion),
  countryGhgEmissionsMap: handleActions(countryGhgEmissionsMapComponent),
  countryGhgEmissions: handleActions(countryGhgEmissionsComponent),
  countrySDGLinkages: handleActions(countrySDGLinkagesComponent),
  countryNDCOverview: handleActions(countryNDCOverviewComponent),
  espGraph: handleActions(emissionPathwayGraphComponent)
};

export default combineReducers({
  ...providersReducers,
  ...pagesReducers,
  ...componentsReducers
});
