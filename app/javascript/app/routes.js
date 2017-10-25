import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import Root from 'app/pages/root';
import Home from 'pages/home';
import NDCS from 'pages/ndcs';
import NDCSDG from 'pages/ndc-sdg';
import NDCMap from 'components/ndcs-map';
import NDCTable from 'components/ndcs-table';
import NDCCountry from 'pages/ndc-country';
import NDCCountryFull from 'pages/ndc-country-full';
import NDCCompare from 'pages/ndc-compare';
import CountryIndex from 'pages/country-index';
import Country from 'pages/country';
import CountryNdcOverview from 'components/country-ndc-overview';
import NDCSearch from 'pages/ndc-search';
import GHGEmissions from 'pages/ghg-emissions';
import About from 'pages/about';
import GHGCountryEmissions from 'components/country-ghg';
import NDCSDGLinkages from 'components/country-ndc-sdg-linkages';
import ClimateVulnerability from 'components/country-climate-vulnerability';
import error from 'pages/error';

export default [
  {
    component: Root,
    routes: [
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
        headerImage: 'countries'
      },
      {
        path: '/sectors',
        component: error,
        exact: true,
        nav: true,
        label: 'SECTORS'
      },
      {
        path: '/ndcs/country/:iso',
        component: NDCCountry,
        exact: true,
        headerImage: 'ndc'
      },
      {
        path: '/ndcs/country/:iso/full',
        component: NDCCountryFull,
        exact: true,
        headerImage: 'ndc'
      },
      {
        path: '/ndcs/compare',
        component: NDCCompare,
        exact: true,
        headerImage: 'ndc'
      },
      {
        path: '/ndcs',
        component: NDCS,
        nav: true,
        label: 'NDCs',
        headerImage: 'ndc',
        routes: [
          {
            path: '/ndcs',
            component: NDCMap,
            exact: true,
            anchor: true,
            label: 'Map'
          },
          {
            path: '/ndcs/table',
            component: NDCTable,
            exact: true,
            anchor: true,
            label: 'Table'
          },
          {
            path: '/ndcs',
            component: () => createElement(Redirect, { to: '/ndcs' })
          }
        ]
      },
      {
        path: '/ndcs-sdg',
        component: NDCSDG,
        exact: true,
        nav: true,
        label: 'SDG LINKAGES',
        headerImage: 'ndc-sdg'
      },
      {
        path: '/countries/:iso',
        component: Country,
        headerImage: 'countries',
        sections: [
          {
            hash: 'ghg-emissions',
            label: 'GHG Emissions',
            anchor: true,
            component: GHGCountryEmissions
          },
          {
            hash: 'climate-vulnerability',
            label: 'Climate vulnerability and readiness',
            anchor: true,
            component: ClimateVulnerability
          },
          {
            hash: 'ndc-content-overview',
            label: 'NDC Content Overview',
            anchor: true,
            component: CountryNdcOverview
          },
          {
            hash: 'ndc-sdg-linkages',
            label: 'NDC-SDG Linkages',
            anchor: true,
            component: NDCSDGLinkages
          }
        ]
      },
      {
        path: '/ghg-emissions',
        component: GHGEmissions,
        exact: true,
        nav: true,
        label: 'GHG EMISSIONS',
        headerImage: 'emissions'
      },
      {
        path: '/ndc-search',
        exact: true,
        component: NDCSearch,
        headerImage: 'ndc'
      },
      {
        path: '/stories',
        component: error,
        exact: true,
        nav: true,
        label: 'STORIES'
      },
      {
        path: '/about',
        component: About,
        exact: true,
        nav: true,
        label: 'ABOUT',
        headerImage: 'about'
      },
      {
        path: '/error-page',
        component: error
      },
      {
        path: '/',
        component: () => createElement(Redirect, { to: '/error-page' })
      }
    ]
  }
];
