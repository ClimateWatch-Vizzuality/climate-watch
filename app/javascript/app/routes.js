import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import Root from 'app/pages/root';
import Home from 'pages/home';
import NDCS from 'pages/ndcs';
import NDCMap from 'components/ndcs-map';
import NDCTable from 'components/ndcs-table';
import NDCCountry from 'pages/ndc-country';
import NDCCountryFull from 'pages/ndc-country-full';
import Country from 'pages/country';
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
        path: '/ndcs',
        component: NDCS,
        routes: [
          {
            path: '/ndcs',
            component: NDCMap,
            exact: true,
            link: true,
            label: 'Map'
          },
          {
            path: '/ndcs/table',
            component: NDCTable,
            exact: true,
            link: true,
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
        component: Country
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
