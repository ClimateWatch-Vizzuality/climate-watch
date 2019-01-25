/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from 'app/utils/redux';
// Restore when library ready to IE
import { handleModule } from 'redux-tools';

// Providers
import * as loginProvider from 'providers/login-provider';
import * as countriesProvider from 'providers/countries-provider';
import * as regionsProvider from 'providers/regions-provider';
import * as espLocationsProvider from 'providers/esp-locations-provider';
import * as espTimeSeriesProvider from 'providers/esp-time-series-provider';
import * as adaptationsProvider from 'providers/adaptations-provider';
import * as ndcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import * as ndcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import * as ndcContentOverviewProvider from 'providers/ndc-content-overview-provider';
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
import * as emissionsProvider from 'providers/emissions-provider';
import * as dataExplorerProvider from 'providers/data-explorer-provider';
import * as lawsAndPoliciesProvider from 'providers/laws-and-policies-provider';
import * as agricultureCountriesContextsProvider from 'providers/agriculture-countries-context-provider';
import * as agricultureEmissionsProvider from 'providers/agriculture-emissions-provider';
import * as agricultureLandAreaProvider from 'providers/agriculture-land-area-provider';

const providersReducers = {
  login: handleModule(loginProvider),
  countries: handleActions(countriesProvider),
  regions: handleActions(regionsProvider),
  adaptations: handleActions(adaptationsProvider),
  emissions: handleActions(emissionsProvider),
  ndcsSdgsMeta: handleActions(ndcsSdgsMetaProvider),
  ndcsSdgsData: handleActions(ndcsSdgsDataProvider),
  ghgEmissionsMeta: handleActions(ghgEmissionsProvider),
  geoLocation: handleActions(geoLocationProvider),
  wbCountryData: handleActions(wbCountryProvider),
  socioeconomics: handleActions(socioeconomicsProvider),
  timeline: handleActions(timelineProvider),
  ndcsDocumentsMeta: handleActions(ndcsDocumentsMetaProvider),
  ndcContentOverview: handleActions(ndcContentOverviewProvider),
  espModels: handleActions(espModelsProvider),
  espScenarios: handleActions(espScenariosProvider),
  espIndicators: handleActions(espIndicatorsProvider),
  espIndicatorsTrend: handleActions(espIndicatorsTrendProvider),
  espLocations: handleActions(espLocationsProvider),
  espTimeSeries: handleActions(espTimeSeriesProvider),
  dataExplorer: handleActions(dataExplorerProvider),
  lawsAndPolicies: handleActions(lawsAndPoliciesProvider),
  agricultureCountriesContexts: handleActions(
    agricultureCountriesContextsProvider
  ),
  agricultureEmissions: handleActions(agricultureEmissionsProvider),
  agricultureLandArea: handleActions(agricultureLandAreaProvider)
};

// Pages
import * as NDCSPage from 'pages/ndcs';
import * as countryNDCFullPage from 'pages/ndc-country-full';
import * as ndcSearchPage from 'pages/ndc-search';
import * as myCWEditor from 'pages/my-climate-watch/my-cw-editor';

const pagesReducers = {
  ndcs: handleActions(NDCSPage),
  countryNDCFull: handleActions(countryNDCFullPage),
  ndcSearch: handleActions(ndcSearchPage),
  myCWEditor: handleModule(myCWEditor)
};

// Components
import * as mapComponent from 'components/map';
import * as autocompleteSearchComponent from 'components/autocomplete-search';
import * as storiesComponent from 'components/stories';
import * as countrySelectComponent from 'components/countries-select';
import * as modalDownloadComponent from 'components/modal-download';
import * as modalMetadataComponent from 'components/modal-metadata';
import * as modalESPOverviewComponent from 'components/modal-overview';
import * as espGraphComponent from 'components/emission-pathways/emission-pathways-graph';
import * as ndcCountryAccordion from 'components/ndcs/ndcs-country-accordion';
import * as countryGhgEmissionsMapComponent from 'components/country/country-ghg-map';
import * as countryGhgEmissionsComponent from 'components/country/country-ghg-emissions';
import * as countrySDGLinkagesComponent from 'components/country/country-ndc-sdg-linkages';
import * as myInsights from 'components/my-climate-watch/my-insights';
import * as myVisualisations from 'components/my-climate-watch/my-visualisations';
import * as myVisualisationsCreator from 'components/my-climate-watch/viz-creator';
import * as myVisualisationsGraphComponent from 'components/my-climate-watch/my-visualisations/my-cw-vis-graph';
import * as ndcSdgLinkagesComponent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import * as HamburgerComponent from 'components/hamburger';
import * as AnchorNavComponent from 'components/anchor-nav';

const componentsReducers = {
  map: handleActions(mapComponent),
  autocompleteSearch: handleActions(autocompleteSearchComponent),
  stories: handleActions(storiesComponent),
  countrySelect: handleActions(countrySelectComponent),
  modalDownload: handleActions(modalDownloadComponent),
  modalMetadata: handleActions(modalMetadataComponent),
  modalESPOverview: handleActions(modalESPOverviewComponent),
  ndcCountryAccordion: handleActions(ndcCountryAccordion),
  countryGhgEmissionsMap: handleActions(countryGhgEmissionsMapComponent),
  countryGhgEmissions: handleActions(countryGhgEmissionsComponent),
  countrySDGLinkages: handleActions(countrySDGLinkagesComponent),
  insights: handleModule(myInsights),
  visualisations: handleModule(myVisualisations),
  vizCreator: handleModule(myVisualisationsCreator),
  vizGraph: handleModule(myVisualisationsGraphComponent),
  espGraph: handleActions(espGraphComponent),
  ndcSdg: handleActions(ndcSdgLinkagesComponent),
  hamburger: handleActions(HamburgerComponent),
  anchorNav: handleActions(AnchorNavComponent)
};

export default combineReducers({
  ...providersReducers,
  ...pagesReducers,
  ...componentsReducers
});
