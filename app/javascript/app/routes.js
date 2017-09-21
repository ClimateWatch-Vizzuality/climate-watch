import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import Root from 'app/pages/root';
import Home from 'pages/home';
import NDCS from 'pages/ndcs';
import NDCMap from 'components/ndcs-map';
import NDCTable from 'components/ndcs-table';
import NDCCountry from 'pages/ndc-country';
import NDCCountryFull from 'pages/ndc-country-full';
import NDCCompare from 'pages/ndc-compare';
import CountryIndex from 'pages/country-index';
import Country from 'pages/country';
import NDCSearch from 'pages/ndc-search';
import GHGEmissions from 'pages/ghg-emissions';
import About from 'pages/about';
import GHGCountryEmissions from 'components/country-ghg-emissions';
import NDCSDGLinkages from 'components/country-ndc-sdg-linkages';
import error from 'pages/error';

export default [
  {
    component: Root,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/countries',
        exact: true,
        component: CountryIndex,
        nav: true,
        label: 'COUNTRIES'
      },
      {
        path: '/sectors',
        exact: true,
        component: error,
        nav: true,
        label: 'SECTORS'
      },
      {
        path: '/ndcs/country/:iso',
        component: NDCCountry,
        exact: true
      },
      {
        path: '/ndcs/country/:iso/full',
        component: NDCCountryFull,
        exact: true
      },
      {
        path: '/ndcs/compare',
        component: NDCCompare,
        exact: true
      },
      {
        path: '/ndcs',
        component: NDCS,
        nav: true,
        label: 'NDCs',
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
        path: '/countries/:iso',
        component: Country,
        sections: [
          {
            hash: 'ghg-emissions',
            label: 'GHG Emissions',
            anchor: true,
            component: GHGCountryEmissions
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
        exact: true,
        component: GHGEmissions,
        nav: true,
        label: 'GHG-EMISSIONS'
      },
      {
        path: '/ndc-search',
        exact: true,
        component: NDCSearch
      },
      {
        path: '/stories',
        exact: true,
        component: error,
        nav: true,
        label: 'STORIES'
      },
      {
        path: '/about',
        exact: true,
        component: About,
        nav: true,
        label: 'ABOUT'
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
