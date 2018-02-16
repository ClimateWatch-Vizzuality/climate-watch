import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

// components
import Home from 'pages/home';
import About from 'pages/about';
import CountryIndex from 'pages/country-index';
import CountriesSelect from 'components/countries-select';
import CountryCompare from 'pages/country-compare';
import Sectors from 'pages/sectors';
import NDCCountryFull from 'pages/ndc-country-full';
import NDCCountry from 'pages/ndc-country';
import NDCCompare from 'pages/ndc-compare';
import NDCS from 'pages/ndcs';
import NDCSDG from 'pages/ndc-sdg';
import Country from 'pages/country';
import EmissionPathways from 'pages/emission-pathways';
import GHGEmissions from 'pages/ghg-emissions';
import NDCSearch from 'pages/ndc-search';
import error from 'pages/error';
import EmissionPathwaysModel from 'pages/emission-pathways-model';
import EmissionPathwaysScenario from 'pages/emission-pathways-scenario';

// routes
import NDCCountryRoutes from './NDCCountry-routes';
import NDCCompareRoutes from './NDCCompare-routes';
import NDCSRoutes from './NDCS-routes';
import aboutRoutes from './about-routes';
import emissionPathwaysRoutes from './emission-pathways-routes';
import emissionPathwaysModelRoutes from './emission-pathways-model-routes';

// sections
import countrySections from './country-sections';
import emissionPathwaysModelSections from './emission-pathways-model-sections';
import emissionPathwaysScenarioSections from './emission-pathways-scenario-sections';
import emissionPathwaysSections from './emission-pathways-sections';

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
    headerImage: 'ndc'
  },
  {
    path: '/sectors',
    component: Sectors,
    exact: true,
    nav: true,
    label: 'SECTORS'
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
    path: '/ndcs/compare',
    component: NDCCompare,
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: NDCCompareRoutes
  },
  {
    label: 'NDCs',
    nav: true,
    routes: [
      {
        path: '/ndcs',
        label: 'NDC Content'
      },
      {
        path: '/ndcs-sdg',
        label: 'NDC-SDG LINKAGES'
      }
    ]
  },
  {
    path: '/ndcs',
    component: NDCS,
    label: 'NDCs',
    headerImage: 'ndc',
    headerColor: '#035388',
    routes: NDCSRoutes
  },
  {
    path: '/ndcs-sdg',
    component: NDCSDG,
    exact: true,
    label: 'SDG LINKAGES',
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
    path: '/about',
    component: About,
    nav: true,
    label: 'ABOUT',
    headerImage: 'about',
    headerColor: '#113750',
    routes: aboutRoutes
  },
  {
    path: '/error-page',
    component: error
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/error-page' })
  }
];
