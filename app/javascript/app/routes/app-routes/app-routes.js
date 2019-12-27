import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

// components
import Home from 'pages/home';
import About from 'pages/about';
import CountryIndex from 'pages/country-index';
import CountriesSelect from 'components/countries-select';
import CountryCompare from 'pages/country-compare';
import NDCCountryFull from 'pages/ndc-country-full';
import NDCCountry from 'pages/ndc-country';
import LTSCountry from 'pages/lts-country';
import NDCCompare from 'pages/ndc-compare';
import NDCS from 'pages/ndcs';
import NDCSEnhancements from 'pages/ndcs-enhancements';
import NDCSLTS from 'pages/ndcs-lts';
import NDCSDG from 'pages/ndc-sdg';
import Country from 'pages/country';
import EmissionPathways from 'pages/emission-pathways';
import GHGEmissions from 'pages/ghg-emissions';
import NDCSearch from 'pages/ndc-search';
import error from 'pages/error';
import MyClimateWatch from 'pages/my-climate-watch';
import DataExplorer from 'pages/data-explorer';
import EmissionPathwaysModel from 'pages/emission-pathways-model';
import EmissionPathwaysScenario from 'pages/emission-pathways-scenario';
import Sectors from 'pages/sectors';
import SectorsAgriculture from 'pages/sectors-agriculture';
import LTSExplore from 'pages/lts-explore';
import NDCSExplore from 'pages/ndcs-explore';
import NdcOverview from 'pages/ndc-overview';

// routes
import NDCSRoutes from './NDCS-routes';
import NDCCountryRoutes from './NDCCountry-routes';
import LTSCountryRoutes from './LTSCountry-routes';
import NDCCompareRoutes from './NDCCompare-routes';
import NDCSContentRoutes from './NDCSContent-routes';
import MyCwRoutes from './my-cw-routes';
import DataExplorerRoutes from './data-explorer-routes';
import AboutRoutes from './about-routes';
import AboutNestedRoutes from './about-nested-routes';
import emissionPathwaysRoutes from './emission-pathways-routes';
import emissionPathwaysModelRoutes from './emission-pathways-model-routes';
import sectorsRoutes from './sectors-routes';

// sections
import countrySections from './country-sections';
import emissionPathwaysModelSections from './emission-pathways-model-sections';
import emissionPathwaysScenarioSections from './emission-pathways-scenario-sections';
import emissionPathwaysSections from './emission-pathways-sections';
import countryCompareSections from './country-compare-sections';
import agricultureSections from './sectors-agriculture-sections';
import ndcsEnhancementsSections from './ndcs-enhancements-sections';
import ndcsLTSSections from './lts-tracker-sections';
import LTSExploreSections from './lts-explore-sections';
import NDCSExploreSections from './ndcs-explore-sections';

const FEATURE_AGRICULTURE = process.env.FEATURE_AGRICULTURE === 'true';
const FEATURE_LTS_EXPLORE = process.env.FEATURE_LTS_EXPLORE === 'true';
const FEATURE_COMMITMENTS_OVERVIEW =
  process.env.FEATURE_COMMITMENTS_OVERVIEW === 'true';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    headerImage: 'home'
  },
  {
    path: '/countries',
    component: CountryIndex,
    exact: true,
    nav: true,
    label: 'COUNTRIES',
    headerImage: 'countries',
    navNestedMenu: true,
    Child: CountriesSelect
  },
  {
    path: '/countries/compare',
    component: CountryCompare,
    exact: true,
    headerImage: 'countries',
    headerColor: '#045F61',
    sections: countryCompareSections
  },
  FEATURE_AGRICULTURE
    ? {
      nav: true,
      label: 'SECTORS',
      routes: sectorsRoutes
    }
    : {
      path: '/sectors',
      component: Sectors,
      exact: true,
      nav: true,
      label: 'SECTORS'
    },
  FEATURE_AGRICULTURE && {
    path: '/sectors/agriculture',
    component: SectorsAgriculture,
    headerImage: 'sectors-agriculture',
    headerColor: '#0677B3',
    sections: agricultureSections
  },
  FEATURE_AGRICULTURE && {
    path: '/sectors/coming-soon',
    component: Sectors
  },
  FEATURE_COMMITMENTS_OVERVIEW && {
    path: '/ndc-overview',
    component: NdcOverview,
    headerImage: 'ndc'
  },
  {
    path: '/ndcs/country/:iso/full',
    component: NDCCountryFull,
    exact: true,
    headerImage: 'ndc'
  },
  {
    path: '/ndcs/country/:iso',
    component: NDCCountry,
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: NDCCountryRoutes
  },
  {
    path: '/lts/country/:iso',
    component: LTSCountry,
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: LTSCountryRoutes
  },
  {
    path: '/ndcs/compare',
    component: NDCCompare,
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: NDCCompareRoutes
  },
  {
    nav: true,
    label: FEATURE_LTS_EXPLORE ? 'COMMITMENTS' : 'NDCs',
    routes: NDCSRoutes
  },
  {
    path: '/ndcs-content',
    component: NDCS,
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: NDCSContentRoutes
  },
  FEATURE_LTS_EXPLORE && {
    path: '/lts-explore',
    component: LTSExplore,
    headerImage: 'ndc',
    headerColor: '#035388',
    sections: LTSExploreSections
  },
  FEATURE_LTS_EXPLORE && {
    path: '/ndcs-explore',
    component: NDCSExplore,
    headerImage: 'ndc',
    headerColor: '#035388',
    sections: NDCSExploreSections
  },
  {
    path: '/2020-ndc-tracker',
    component: NDCSEnhancements,
    headerImage: 'ndc',
    headerColor: '#035388',
    sections: ndcsEnhancementsSections
  },
  {
    path: '/lts-tracker',
    component: NDCSLTS,
    headerImage: 'ndc',
    headerColor: '#035388',
    sections: ndcsLTSSections
  },
  {
    path: '/ndcs-sdg',
    component: NDCSDG,
    exact: true,
    headerImage: 'ndc-sdg'
  },
  {
    path: '/countries/:iso',
    component: Country,
    headerImage: 'countries',
    headerColor: '#045F61',
    sections: countrySections
  },
  {
    path: '/ghg-emissions',
    component: GHGEmissions,
    nav: true,
    exact: true,
    label: 'GHG EMISSIONS',
    headerImage: 'emissions',
    headerColor: '#46407D'
  },
  {
    path: '/pathways/models/:id',
    component: EmissionPathwaysModel,
    label: 'PATHWAYS MODEL',
    headerImage: 'emission-pathways',
    headerColor: '#74356A',
    sections: emissionPathwaysModelSections,
    routes: emissionPathwaysModelRoutes
  },
  {
    path: '/pathways/scenarios/:id',
    component: EmissionPathwaysScenario,
    label: 'PATHWAYS SCENARIO',
    headerImage: 'emission-pathways',
    headerColor: '#74356A',
    sections: emissionPathwaysScenarioSections
  },
  {
    path: '/pathways',
    component: EmissionPathways,
    nav: true,
    label: 'PATHWAYS',
    headerImage: 'emission-pathways',
    sections: emissionPathwaysSections,
    routes: emissionPathwaysRoutes,
    headerColor: '#74356A'
  },
  {
    path: '/ndc-search',
    exact: true,
    component: NDCSearch,
    headerImage: 'ndc',
    headerColor: '#035388'
  },
  {
    path: '/stories',
    component: error,
    exact: true,
    nav: false,
    label: 'STORIES'
  },
  {
    path: '/my-climate-watch',
    component: MyClimateWatch,
    routes: MyCwRoutes
  },
  {
    path: '/data-explorer',
    component: DataExplorer,
    routes: DataExplorerRoutes
  },
  {
    path: '/about',
    component: About,
    label: 'ABOUT',
    headerImage: 'about',
    headerColor: '#113750',
    routes: AboutRoutes
  },
  {
    nav: true,
    label: 'ABOUT',
    routes: AboutNestedRoutes
  },
  {
    path: '/error-page',
    component: error
  },
  {
    path: '/error-page',
    component: error
  },
  {
    path: '/my-climate-watch',
    label: 'MY CW'
  },
  {
    path: '/data-explorer',
    label: 'DATA EXPLORER'
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/error-page' })
  }
];
