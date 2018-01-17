import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCMap from 'components/ndcs/ndcs-map';
import GhgEmissionsGraph from 'components/ghg-emissions';
import GHGCountryEmissions from 'components/country/country-ghg';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';

export default [
  {
    path: '/embed/ndcs',
    component: NDCMap,
    exact: true
  },
  {
    path: '/embed/ghg-emissions',
    component: GhgEmissionsGraph,
    exact: true
  },
  {
    path: '/embed/countries/:iso/ghg-emissions',
    component: GHGCountryEmissions,
    exact: true
  },
  {
    path: '/embed/ndcs-sdg',
    component: NdcSdgLinkagesContent,
    exact: true
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/' })
  }
];
