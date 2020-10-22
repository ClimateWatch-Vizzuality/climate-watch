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
import NDCCompareAll from 'pages/ndc-compare-all-targets';
import NDCSEnhancements from 'pages/ndcs-enhancements';
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
import NetZero from 'pages/net-zero';
import NDCSExplore from 'pages/ndcs-explore';
import NdcOverview from 'pages/ndc-overview';
import CustomCompare from 'pages/custom-compare';

import { HEADER_GRADIENTS, HEADER_COLORS } from 'styles/constants';

// routes
import NDCSRoutes from './NDCS-routes';
import NDCCountryRoutes from './NDCCountry-routes';
import LTSCountryRoutes from './LTSCountry-routes';
import NDCCompareRoutes from './NDCCompare-routes';
import MyCwRoutes from './my-cw-routes';
import DataExplorerRoutes from './data-explorer-routes';
import AboutRoutes from './about-routes';
import AboutNestedRoutes from './about-nested-routes';
import emissionPathwaysRoutes from './emission-pathways-routes';
import emissionPathwaysModelRoutes from './emission-pathways-model-routes';
import sectorsRoutes from './sectors-routes';
import CustomCompareRoutes from './custom-compare-routes';

// sections
import countrySections from './country-sections';
import emissionPathwaysModelSections from './emission-pathways-model-sections';
import emissionPathwaysScenarioSections from './emission-pathways-scenario-sections';
import emissionPathwaysSections from './emission-pathways-sections';
import countryCompareSections from './country-compare-sections';
import agricultureSections from './sectors-agriculture-sections';
import ndcsEnhancementsSections from './ndcs-enhancements-sections';
import LTSExploreSections from './lts-explore-sections';
import NetZeroSections from './net-zero-sections';
import NDCSExploreSections from './ndcs-explore-sections';
import NDCOverviewRoutes from './ndcs-overview-routes';

// Main pages have a gradient header color and secondary have a single color
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
    navNestedMenu: true,
    Child: CountriesSelect,
    headerGradient: HEADER_GRADIENTS.countries
  },
  {
    path: '/countries/compare',
    component: CountryCompare,
    exact: true,
    sections: countryCompareSections,
    headerColor: HEADER_COLORS.countries
  },
  {
    nav: true,
    label: 'SECTORS',
    routes: sectorsRoutes
  },
  {
    path: '/sectors/agriculture',
    component: SectorsAgriculture,
    sections: agricultureSections,
    headerGradient: HEADER_GRADIENTS.sectors
  },
  {
    path: '/sectors/coming-soon',
    component: Sectors,
    headerGradient: HEADER_GRADIENTS.sectors
  },
  {
    path: '/ndc-overview',
    component: NdcOverview,
    routes: NDCOverviewRoutes,
    headerGradient: HEADER_GRADIENTS.commitments
  },
  {
    path: '/ndcs/country/:iso/full',
    component: NDCCountryFull,
    exact: true,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/ndcs/country/:iso',
    component: NDCCountry,
    headerImage: 'ndc',
    routes: NDCCountryRoutes,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/lts/country/:iso',
    component: LTSCountry,
    headerImage: 'ndc',
    routes: LTSCountryRoutes,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/compare-all-targets',
    component: NDCCompareAll,
    headerGradient: HEADER_GRADIENTS.commitments,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/ndcs/compare', // Legacy: only for outdated links
    component: NDCCompare,
    headerGradient: HEADER_GRADIENTS.commitments,
    routes: NDCCompareRoutes,
    headerColor: HEADER_COLORS.ndc
  },
  {
    nav: true,
    label: 'COMMITMENTS',
    routes: NDCSRoutes
  },
  {
    path: '/lts-explore',
    component: LTSExplore,
    headerImage: 'ndc',
    sections: LTSExploreSections,
    headerGradient: HEADER_GRADIENTS.commitments
  },
  {
    path: '/ndcs-explore',
    component: NDCSExplore,
    headerImage: 'ndc',
    sections: NDCSExploreSections,
    headerGradient: HEADER_GRADIENTS.commitments
  },
  {
    path: '/net-zero-tracker',
    component: NetZero,
    sections: NetZeroSections,
    headerGradient: HEADER_GRADIENTS.commitments,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/2020-ndc-tracker',
    component: NDCSEnhancements,
    headerImage: 'ndc',
    sections: ndcsEnhancementsSections,
    headerGradient: HEADER_GRADIENTS.commitments
  },
  {
    path: '/ndcs-sdg',
    component: NDCSDG,
    exact: true,
    headerGradient: HEADER_GRADIENTS.commitments
  },
  {
    path: '/custom-compare',
    component: CustomCompare,
    routes: CustomCompareRoutes,
    headerColor: HEADER_COLORS.ndc
  },
  {
    path: '/countries/:iso',
    component: Country,
    headerImage: 'countries',
    sections: countrySections,
    headerGradient: HEADER_GRADIENTS.countries
  },
  {
    path: '/ghg-emissions',
    component: GHGEmissions,
    nav: true,
    exact: true,
    label: 'GHG EMISSIONS',
    headerGradient: HEADER_GRADIENTS.emissions
  },
  {
    path: '/pathways/models/:id',
    component: EmissionPathwaysModel,
    label: 'PATHWAYS MODEL',
    sections: emissionPathwaysModelSections,
    routes: emissionPathwaysModelRoutes,
    headerColor: HEADER_COLORS.emissions
  },
  {
    path: '/pathways/scenarios/:id',
    component: EmissionPathwaysScenario,
    label: 'PATHWAYS SCENARIO',
    headerImage: 'emission-pathways',
    sections: emissionPathwaysScenarioSections,
    headerColor: HEADER_COLORS.emissions
  },
  {
    path: '/pathways',
    component: EmissionPathways,
    nav: true,
    label: 'PATHWAYS',
    headerImage: 'emission-pathways',
    sections: emissionPathwaysSections,
    routes: emissionPathwaysRoutes,
    headerGradient: HEADER_GRADIENTS.emissions
  },
  {
    path: '/ndc-search',
    exact: true,
    component: NDCSearch,
    headerImage: 'ndc',
    headerColor: HEADER_COLORS.ndc
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
    routes: AboutRoutes,
    headerGradient: HEADER_GRADIENTS.about
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
    path: '/ndcs-content',
    component: () => createElement(Redirect, { to: '/ndcs-explore' })
  },
  {
    path: '/lts-tracker',
    component: () => createElement(Redirect, { to: '/lts-explore' })
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/error-page' })
  }
];
